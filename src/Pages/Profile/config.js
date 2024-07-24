export const calculateYearsMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months };
};

export const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const formatDuration = ({ years, months }) => {
  const yearStr = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthStr = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return `${yearStr}${yearStr && monthStr ? " " : ""}${monthStr}`;
};

export const formatDateWithYearMonth = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
