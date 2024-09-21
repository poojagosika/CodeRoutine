import Problem from "../../Model/Problem/problemModel.js";

// Controller to get all problems with pagination, filters by difficulty, tags, and title
export const getProblems = async (req, res) => {
  try {
    // Extract optional query parameters from the request
    const { difficulty, tags, title, page = 1, limit = 10 } = req.query;

    // Build a query object to filter based on the request parameters
    let query = {};

    if (difficulty) {
      query.difficulty = difficulty; // Filter by difficulty (easy, medium, hard)
    }

    if (tags) {
      query.tags = { $in: tags.split(",") }; // Filter by tags, expects a comma-separated string of tags
    }

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Search by title (case insensitive)
    }

    // Convert page and limit to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Fetch problems from the database with pagination and query filters applied
    const problems = await Problem.find(query)
      .select("-hiddenTestCases") // Exclude hidden test cases
      .skip(skip) // Skip the number of documents based on the page
      .limit(limitNum); // Limit the number of documents returned

    // Get the total number of problems (for pagination)
    const totalProblems = await Problem.countDocuments(query);

    // Check if problems are found
    if (problems.length === 0) {
      return res
        .status(404)
        .json({ message: "No problems found matching the criteria." });
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalProblems / limitNum);

    // Return the fetched problems with pagination info
    return res.status(200).json({
      problems,
      pagination: {
        totalProblems,
        currentPage: pageNum,
        totalPages,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching problems.", error: error.message });
  }
};

/**
Explanation of Changes:
Pagination Parameters:

page: This is the current page number (default is 1).
limit: This is the number of problems to return per page (default is 10).
Pagination Logic:

skip: This calculates how many documents to skip based on the current page.
Formula: (pageNum - 1) * limitNum
limit: This limits the number of problems returned to limitNum.
Total Count:

totalProblems: We use Problem.countDocuments(query) to get the total number of problems matching the query. This is important to calculate the total number of pages for pagination.
Pagination Info:

The response includes a pagination object with details such as:
totalProblems: The total number of problems matching the query.
currentPage: The current page number.
totalPages: The total number of pages based on the total problems and limit.
limit: The limit of problems per page.

Example Usage:
Fetch the first page of problems, 10 problems per page (default): /api/problems
Fetch the second page with 5 problems per page: /api/problems?page=2&limit=5
Filter problems by difficulty medium and paginate: /api/problems?difficulty=medium&page=3&limit=5
Search problems by title and paginate: /api/problems?title=Palindrome&page=1&limit=10
 * */
