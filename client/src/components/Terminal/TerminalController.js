import React, { useState } from 'react';
import Terminal, { LineType } from 'react-terminal-ui';

const TerminalController = (props = {}) => {
    const [terminalLineData, setTerminalLineData] = useState([]);

    function isValidInput(input) {
        const args = input.split(/\s+/).map(arg => arg.trim()).filter(arg => arg !== "");
        return args[0] === 'node' && args[1] === 'index.js';
    }

    function onInput(input) {
        let ld = [...terminalLineData];
        ld.push({ type: LineType.Input, value: input });

        if (isValidInput(input)) {
            const code = "console.log = val => val;" + localStorage.getItem("code");
            let result = eval(code);
            result = (!result ||result.toString() === "val => val") ? "<No output>" : result.toString();
            console.log(result)

            ld.push({ type: LineType.Output, value: result });
        } else if (input.toLocaleLowerCase() === 'clear') {
            ld = [];
        } else {
            ld.push({ type: LineType.Output, value: 'Unrecognized command' });
        }

        setTerminalLineData(ld);
    }

    return (
        <div className="container">
            <Terminal name='-zsh' lineData={terminalLineData} onInput={onInput} />
        </div>
    )
};

export default TerminalController;