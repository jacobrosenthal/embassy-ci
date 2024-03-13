const core = require('@actions/core');


function parseSizeBerkley(content) {
    const lines = content.split('\n');
    const headers = lines[0].split(/\s+/).filter(Boolean);
    const values = lines[1].split(/\s+/).filter(Boolean);
    return { headers, values };
}



let markdownTable;
try {
    const newContent = parseSizeBerkley(process.env.CURRENT_SIZE);
    markdownTable = `\n| ${newContent.headers.join(' | ')} |\n| --- | --- | --- | --- | --- | --- |\n| ${newContent.values.join(' | ')} |\n`;

} catch (e) {
    console.log("Parent current size failed", e, typeof process.env.CURRENT_SIZE, process.env.CURRENT_SIZE)
}

if (process.env.PARENT_SIZE) {
    try {
        const oldContentFields = parseSizeBerkley(process.env.PARENT_SIZE);
        let differences = oldContentFields.values.map((oldValue, index) => {
            if (index >= 3) return " ";

            const parsedOld = parseInt(oldValue, 10);
            const parsedNew = parseInt(newContent.values[index], 10);
            if (isNaN(parsedOld) || isNaN(parsedNew)) {
                throw new Error("Invalid integer" + `: "${oldValue} ${newContent.values[index]}"`);
            }
            const diff = parsedNew - parsedOld
            return diff >= 0 ? `+${diff}` : `${diff}`;
        });

        markdownTable += `| ${oldContentFields.values.join(' | ')} |\n`;
        markdownTable += `| ${differences.join(' | ')} |\n`;

    } catch (e) {
        console.log("Parent notes fetch/parsing failed", e, typeof process.env.PARENT_SIZE, process.env.PARENT_SIZE)
    }
}

core.setOutput('markdownTable', markdownTable);

