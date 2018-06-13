'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Products", deps: []
 * createTable "Releases", deps: []
 * createTable "Features", deps: [Releases]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2018-05-18T14:32:49.694Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "short_name": {
                    "type": Sequelize.STRING
                },
                "product_line": {
                    "type": Sequelize.STRING
                },
                "created_at": {
                    "type": Sequelize.DATE
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Releases",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "reference_num": {
                    "type": Sequelize.STRING
                },
                "start_date": {
                    "type": Sequelize.DATE
                },
                "release_date": {
                    "type": Sequelize.DATE
                },
                "development_started_date": {
                    "type": Sequelize.DATE
                },
                "owner": {
                    "type": Sequelize.STRING
                },
                "createdBy": {
                    "type": Sequelize.STRING
                },
                "productId": {
                    "type": Sequelize.INTEGER
                },
                "status": {
                    "type": Sequelize.STRING
                },
                "created_at": {
                    "type": Sequelize.DATE
                },
                "updated_at": {
                    "type": Sequelize.DATE
                },
                "released": {
                    "type": Sequelize.BOOLEAN
                },
                "original_estimate": {
                    "type": Sequelize.SMALLINT
                },
                "remaining_estimate": {
                    "type": Sequelize.SMALLINT
                },
                "work_units": {
                    "type": Sequelize.SMALLINT
                },
                "work_done": {
                    "type": Sequelize.SMALLINT
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Features",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "type": {
                    "type": Sequelize.STRING
                },
                "status": {
                    "type": Sequelize.STRING
                },
                "reference_num": {
                    "type": Sequelize.STRING
                },
                "owner": {
                    "type": Sequelize.STRING
                },
                "createdBy": {
                    "type": Sequelize.STRING
                },
                "start_date": {
                    "type": Sequelize.DATE
                },
                "due_date": {
                    "type": Sequelize.DATE
                },
                "created_at": {
                    "type": Sequelize.DATE
                },
                "updated_at": {
                    "type": Sequelize.DATE
                },
                "original_estimate": {
                    "type": Sequelize.SMALLINT
                },
                "remaining_estimate": {
                    "type": Sequelize.SMALLINT
                },
                "work_units": {
                    "type": Sequelize.SMALLINT
                },
                "work_done": {
                    "type": Sequelize.SMALLINT
                },
                "use_requirements_estimate": {
                    "type": Sequelize.BOOLEAN
                },
                "dev_team": {
                    "type": Sequelize.STRING
                },
                "compliance_score": {
                    "type": Sequelize.STRING
                },
                "risk": {
                    "type": Sequelize.STRING
                },
                "internal_id": {
                    "type": Sequelize.INTEGER
                },
                "tags": {
                    "type": Sequelize.JSON
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "ReleaseId": {
                    "type": Sequelize.STRING,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Releases",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
