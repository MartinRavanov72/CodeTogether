import Editor from "@monaco-editor/react";

const CodePage = () => {
    return (
        <Editor
            height="70vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="console.log('Hello World!');"
        />
    )
}

export default CodePage;
