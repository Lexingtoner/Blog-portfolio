import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactsModule } from './contacts/contacts.module';
import { RootController } from './root.controller';

@Module({
    imports: [
        ContactsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                const dbType = process.env.DB_TYPE || (process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite');
                if (dbType === 'sqlite') {
                    return {
                        type: 'sqlite',
                        database: process.env.SQLITE_DB || 'data/db.sqlite',
                        entities: ['dist/**/*.entity{.ts,.js}'],
                        synchronize: process.env.NODE_ENV !== 'production',
                        logging: process.env.NODE_ENV === 'development',
                    };
                }
                return {
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432'),
                    username: process.env.DB_USERNAME || 'postgres',
                    password: process.env.DB_PASSWORD || 'password',
                    database: process.env.DB_NAME || 'portfolio_blog',
                    entities: ['dist/**/*.entity{.ts,.js}'],
                    synchronize: process.env.NODE_ENV !== 'production',
                    logging: process.env.NODE_ENV === 'development',
                };
            },
        }),
        AuthModule,
        ProjectsModule,
        ContactsModule,
    ],
    controllers: [RootController],
    providers: [],
})
export class AppModule { }
