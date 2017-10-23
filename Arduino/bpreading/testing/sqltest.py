#coding=utf-8

import MySQLdb

def db_execute(sql):
    dbs = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_5622', port=3306)
    cursor = dbs.cursor()
    try:
        cursor.execute(sql)
        dbs.commit()
    except:
        dbs.rollback()
    dbs.close()


def read_file(file_path):
    sql_lines = []
    with open(file_path, 'r') as file:
        for line in file.readlines():
            sql = 'INSERT INTO elec_5622.testmodel_exercise_monitor( \
            user_id, monitor_type, pulse, diastolic, systolic) VALUES({0});'.format(line)
            sql_lines.append(sql)

    return '\r\n'.join(sql_lines)

sql_lines = read_file("a.txt")
db_execute(sql_lines)  