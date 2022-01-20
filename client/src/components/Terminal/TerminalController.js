import React, { useState } from 'react';
import Terminal, { LineType } from 'react-terminal-ui';

import Interpreter from '../../lib/interpreter.js';

const TerminalController = (props = {}) => {
    const [terminalLineData, setTerminalLineData] = useState([]);
    let output;

    function isValidInput(input) {
        const args = input.split(/\s+/).map(arg => arg.trim()).filter(arg => arg !== "");
        return args[0] === 'node' && args[1] === 'index.js';
    }

    function initConsoleLogAndAlert(interpreter, globalObject) {
        var wrapperPrint = function __print(text) {
            if (output === undefined) {
                output = "";
            }

            output += text + '\n';
        }

        var wrapperAlert = function alertText(text) {
            return alert(text);
        }

        interpreter.setProperty(globalObject, '__print', interpreter.createNativeFunction(wrapperPrint));
        interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(wrapperAlert));
    }

    function runCode(code) {
        let interpreter = new Interpreter(code, initConsoleLogAndAlert);
        if (interpreter.run()) {
        // Async function hit. There's more code to run.
            setTimeout(runCode.bind(null, code), 100);
        }
    }

    function onInput(input) {
        let ld = [...terminalLineData];
        ld.push({ type: LineType.Input, value: input });

        if (isValidInput(input)) {
            output = undefined;

            let predefinedConsole = `let console = { log: function(code){ __print(code); } }; `;
            let code = predefinedConsole + localStorage.getItem("code");
            
            let options = {
                'presets': ['es2015']
            };
            code = window.Babel.transform(code, options).code;

            try {
                runCode(code);
                output = !output ? "<No output>\n" : output;
                output.split('\n').slice(0, -1).forEach(row => ld.push({ type: LineType.Output, value: row }));
            } catch (e) {
                let regexErrorLine = /(?<=at code:)(\d+)(?=:\d+)/;
                let correctErrorLine = +(regexErrorLine.exec(e.stack)[1]) - 5;
                let error = e.stack.replace(regexErrorLine, correctErrorLine);
                error.split('\n').forEach(row => ld.push({ type: LineType.Output, value: row }));
            }        
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