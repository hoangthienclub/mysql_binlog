const ZongJi = require("zongji");
const mysql = require("mysql");

const zongji = new ZongJi({
    host: "mysql",
    port: "3306",
    user: "food_delivery",
    password: "1111",
});

zongji.on("binlog", function (evt) {
    console.log("===============");
    const timestamp = evt.timestamp;
    const tableId = evt.tableId;
    const tableMap = evt.tableMap;
    const schema = tableMap[tableId];
    const parentSchema = schema.parentSchema;
    const tableName = schema.tableName;
    const rows = evt.rows;
    if (rows && rows.length) {
        console.log({
            timestamp: new Date(timestamp),
            tableName,
            parentSchema,
            //rows: JSON.stringify(rows)
        })
    }
    switch (evt.getEventName()) {
        case "deleterows":
            deleteData(parentSchema, tableName, rows)
            break;
        case "updaterows":
            updateData(parentSchema, tableName, rows)
            break;
        case "writerows":
            insertData(parentSchema, tableName, rows)
            break;
        default:
            console.log("Do not support!");
    }


    console.log("------------")
});

const updateData = (parentSchema, tableName, rows) => {
    console.log("====== UPDATE =========")
    for (const item of rows) {
        const before = item.before;
        const after = item.after;
        console.log({
            before,
            after,
        })
    }
}

const deleteData = (parentSchema, tableName, rows) => {
    console.log("====== DELETE =========")
    for (const item of rows) {
        console.log({
            item,
        })
    }
}

const insertData = (parentSchema, tableName, rows) => {
    console.log("====== NEW =========")
    for (const item of rows) {
        console.log({
            item,
        })
    }
}

zongji.start({
    includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows']
});

process.on("SIGINT", function () {
    console.log("Got SIGINT.");
    zongji.stop();
    process.exit();
});