import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export default class AddUserIdToAppointment1620432775812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }),
    );

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], 
        referencedColumnNames:['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }), 
);
    
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointment', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'user_id');

    }


}
