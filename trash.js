// array of rows to insert
var sql = 'INSERT INTO logs SET data = ?';

var rows = [[/*first row*/], [/*additional row*/]];

connection.beginTransaction(function (err) {

    if (err) { 
        throw err; 
    }

    var insertEachRow = function () {

        var row = rows.shift();

        if (! row) {
            // Done, now commit
            return noMoreRows();
        }

        connection.query(sql, row, function (err, result) {
            if (err) { 
                connection.rollback(function () {
                    throw err;
                });
            }  

            insertEachRow();
        });
    };

    var noMoreRows = function () {
        connection.commit(function (err) {
            if (err) { 
                connection.rollback(function () {
                    throw err;
                });
            }
            console.log('success!');
        });
    };

    insertEachRow();
});





agentAccountModel.add(data, function(err, results) {
	if(err)
	{
		res.status(500);
		res.json({
			"status": 500,
			"message": err
		});
	}

	res.status(200);
	res.json({
		"status": 200,
		"message": "Saved successfully"

	});
});



add : function (data, callback) {

    //Begin transaction
    connection.beginTransaction(function(err) {
        if (err) {
            throw err;
        }

        var user_query = "INSERT INTO `calldata`.`users` (`username`, `password`, `enabled`, `accountNonExpired`, `accountNonLocked`, `credentialsNonExpired`) VALUES ('" + data.mobile + "', '" + sha1(data.password) + "', '1', '1', '1', '1')";
        connection.query(user_query, function(err, results) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }

            var accnt_dtls_query = "INSERT INTO `calldata`.`accnt_dtls` (`req_mob_nmbr`, `usr_nme`, `dvce_id`, `mngr_id`, `cmpny_id`, `actve_flg`, `crtd_on`, `usr`) VALUES (" + data.mobile + ", '" + data.name + "', '', " + data.managerId + ", " + data.companyId + ", 1, now(), '" + data.mobile+ "')";

            connection.query(accnt_dtls_query, function(err, results) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                var user_role_query = "INSERT INTO `calldata`.`user_roles` (`username`, `ROLE`) VALUES ('" + data.mobile + "', '" + data.role + "')";

                connection.query(user_role_query, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }

                    //add an entry to manager table
                    var mngr_dtls_query = "INSERT INTO `calldata`.`mngr_dtls` (`mngr_nm`, `cmpny_id`, `crtd_on`, `usr_nm`, `eml_id`) VALUES ('" + data.name + "'," + data.companyId + " , now(), '" + data.mobile + "', '" + data.mobile + "')";
                    connection.query(mngr_dtls_query, function(err, result) {
                        if (err) {
                            return connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log('Changed ' + result.changedRows + ' results');
                        connection.commit(function (err) {
                            console.log('Commiting transaction.....');
                            if (err) {
                                return connection.rollback(function () {
                                    throw err;
                                });
                            }

                            console.log('Transaction Complete.');
                            connection.end();
                            callback(null, result);
                        });
                    });
                });
            });
        });
    });
    //transaction ends here
}



connection.beginTransaction(function(err) {
	if (err) { throw err; }
	connection.query('INSERT INTO posts SET title=?', title, function(err, result) {
	  if (err) { 
		connection.rollback(function() {
		  throw err;
		});
	  }
  
	  var log = 'Post ' + result.insertId + ' added';
  
	  connection.query('INSERT INTO log SET data=?', log, function(err, result) {
		if (err) { 
		  connection.rollback(function() {
			throw err;
		  });
		}  
		connection.commit(function(err) {
		  if (err) { 
			connection.rollback(function() {
			  throw err;
			});
		  }
		  console.log('success!');
		});
	  });
	});
  });



  async function transaction(queries, queryValues) {
    if (queries.length !== queryValues.length) {
        return Promise.reject(
            'Number of provided queries did not match the number of provided query values arrays'
        )
    }
    const connection = await mysql.createConnection(databaseConfigs)
    try {
        await connection.beginTransaction()
        const queryPromises = []

        queries.forEach((query, index) => {
            queryPromises.push(connection.query(query, queryValues[index]))
        })
        const results = await Promise.all(queryPromises)
        await connection.commit()
        await connection.end()
        return results
    } catch (err) {
        await connection.rollback()
        await connection.end()
        return Promise.reject(err)
    }
}
	/**
	 * Run multiple queries on the database using a transaction. A list of SQL queries
	 * should be provided, along with a list of values to inject into the queries.
	 * @param  {array} queries     An array of mysql queries. These can contain `?`s
	 *                              which will be replaced with values in `queryValues`.
	 * @param  {array} queryValues An array of arrays that is the same length as `queries`.
	 *                              Each array in `queryValues` should contain values to
	 *                              replace the `?`s in the corresponding query in `queries`.
	 *                              If a query has no `?`s, an empty array should be provided.
	 * @return {Promise}           A Promise that is fulfilled with an array of the
	 *                              results of the passed in queries. The results in the
	 *                              returned array are at respective positions to the
	 *                              provided queries.
	 */

function transaction(queries, queryValues) {
    if (queries.length !== queryValues.length) {
        return Promise.reject(
            'Number of provided queries did not match the number of provided query values arrays'
        )
    }

    const connection = mysql.createConnection(databaseConfigs);
    Promise.promisifyAll(connection);
    return connection.connectAsync()
    .then(connection.beginTransactionAsync())
    .then(() => {
        const queryPromises = [];

        queries.forEach((query, index) => {
            queryPromises.push(connection.queryAsync(query, queryValues[index]));
        });
        return Promise.all(queryPromises);
    })
    .then(results => {
        return connection.commitAsync()
        .then(connection.endAsync())
        .then(() => {
            return results;
        });
    })
    .catch(err => {
        return connection.rollbackAsync()
        .then(connection.endAsync())
        .then(() => {
            return Promise.reject(err);
        });
    });
}


async function createOrder() {
    const items = ['RI0002', 'CB0004']
    const connection = await mysql.createConnection(config.db);
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    console.log('Finished setting the isolation level to read committed');
    //set wait timeout and lock wait timeout as per need.
    await connection.beginTransaction();
    try {
      await connection.execute('SELECT id, name FROM product WHERE sku IN (?, ?) FOR UPDATE', items);
      console.log(`Locked rows for skus ${items.join()}`);
      const [itemsToOrder,] = await connection.execute('SELECT name, quantity, price from product WHERE sku IN (?, ?) ORDER BY id', items);
      console.log('Selected quantities for items');
      let orderTotal = 0;
      let orderItems = [];
      for (itemToOrder of itemsToOrder) {
        if (itemToOrder.quantity < 1) {
          throw new Error(`One of the items is out of stock ${itemToOrder.name}`);
        }
        console.log(`Quantity for ${itemToOrder.name} is ${itemToOrder.quantity}`);
        orderTotal += itemToOrder.price;
        orderItems.push(itemToOrder.name);
      }
      await connection.execute(
        'INSERT INTO sales_order (items, total) VALUES (?, ?)', 
        [orderItems.join(), orderTotal]
      )
      console.log(`Order created`);
      await connection.execute(
        `UPDATE product SET quantity=quantity - 1 WHERE sku IN (?, ?)`,
        items
      );
      console.log(`Deducted quantities by 1 for ${items.join()}`);
      await connection.commit();
      const [rows,] = await connection.execute('SELECT LAST_INSERT_ID() as order_id');
      return `order created with id ${rows[0].order_id}`;
    } catch (err) {
      console.error(`Error occurred while creating order: ${err.message}`, err);
      connection.rollback();
      console.info('Rollback successful');
      return 'error creating order';
    }
  }
  
  (async function testOrderCreate() {
    console.log(await createOrder());
    process.exit(0);
  })();



  
var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'YOUR_USERNAME',
      password : 'YOUR_PASSWORD',
      database : 'DB_NAME'
    }
);
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

/* Begin transaction */
connection.beginTransaction(function(err) {
  if (err) { throw err; }
  connection.query('INSERT INTO names SET name=?', "sameer", function(err, result) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }
 
    var log = result.insertId;
 
    connection.query('INSERT INTO log SET logid=?', log, function(err, result) {
      if (err) { 
        connection.rollback(function() {
          throw err;
        });
      }  
      connection.commit(function(err) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
        console.log('Transaction Complete.');
        connection.end();
      });
    });
  });
});
/* End transaction */






