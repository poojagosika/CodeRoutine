import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import CodeIcon from '@mui/icons-material/Code';
const Code = () => {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <div style={{ backgroundColor: "#1e1e1e", width: '100%', overflow: 'auto' }}
        >
            {/* fix do code bar */}
            <div>
                <CodeIcon /> Code
            </div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                style={{ fontSize: '12px' }}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange} />
        </div>
    )
}

export default Code