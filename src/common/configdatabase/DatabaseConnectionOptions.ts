import 'dotenv/config'
import { DatabaseTypeEnum } from './enums/DatabaseTypeEnum'
import { MyCustomLogger } from './logger/MyCustomLogger'
import { PaymentModel } from 'src/sales/models/PaymentModel'
import { ProductModel } from 'src/sales/models/ProductModel'
import { SaleModel } from 'src/sales/models/SaleModel'
import * as fs from 'fs'

export abstract class Database {

    static database_dev = {
        host: process.env.HOST_DEV,
        port: Number(process.env.PORT_DEV),
        username: process.env.USERNAME_DEV,
        password: process.env.PASSWORD_DEV,
        database: process.env.DATABASE_DEV,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        synchronize: true,
        logging: true,
        entities: [PaymentModel, ProductModel, SaleModel],
        logger: new MyCustomLogger()
    }

    static database_prd = {
        host: process.env.HOST_PRD,
        port: Number(process.env.PORT_PRD),
        username: process.env.USERNAME_PRD,
        password: process.env.PASSWORD_PRD,
        database: process.env.DATABASE_PRD,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        synchronize: true,
        logging: true,
        entities: [PaymentModel, ProductModel, SaleModel],
        logger: new MyCustomLogger()
    }

    static getConnectionBasic<T>(): T {

        const database = process.env.NODE_ENV === 'production' ? process.env.DATABASETYPE_PRD : process.env.DATABASETYPE_DEV

        let connection

        switch (database) {

            case DatabaseTypeEnum.MYSQL:
                if (process.env.NODE_ENV === 'development')
                    connection = { type: 'mysql', ...this.database_dev }
                else if (process.env.NODE_ENV === 'production')
                    connection = { type: 'mysql', ...this.database_prd }
                return connection

            case DatabaseTypeEnum.POSTGRES:
                if (process.env.NODE_ENV === 'development')
                    connection = { type: 'postgres', ...this.database_dev, ssl: { ca: fs.readFileSync('/app/global-bundle.pem').toString(), rejectUnauthorized: true } }
                else if (process.env.NODE_ENV === 'production')
                    connection = { type: 'postgres', ...this.database_prd, ssl: { ca: fs.readFileSync('/app/global-bundle.pem').toString(), rejectUnauthorized: true } }
                return connection
        }
    }

    static getConnectionOptions<T>(): T {

        const database = process.env.NODE_ENV === 'production' ? process.env.DATABASETYPE_PRD : process.env.DATABASETYPE_DEV

        let connection

        switch (database) {

            case DatabaseTypeEnum.MYSQL:
                if (process.env.NODE_ENV === 'development')
                    connection = { type: 'mysql', ...this.database_dev }
                else if (process.env.NODE_ENV === 'production')
                    connection = { type: 'mysql', ...this.database_prd }
                return connection

            case DatabaseTypeEnum.POSTGRES:
                if (process.env.NODE_ENV === 'development')
                    connection = { type: 'postgres', ...this.database_dev, schema: process.env.DATABASE_SCHEMA_DEV, ssl: { ca: fs.readFileSync('/app/global-bundle.pem').toString(), rejectUnauthorized: true } }
                else if (process.env.NODE_ENV === 'production')
                    connection = { type: 'postgres', ...this.database_prd, schema: process.env.DATABASE_SCHEMA_PRD, ssl: { ca: fs.readFileSync('/app/global-bundle.pem').toString(), rejectUnauthorized: true } }
                return connection
        }

    }

}
