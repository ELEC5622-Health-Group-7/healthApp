#coding=utf-8

import MySQLdb

def db_execute_exer(sql):
    dbs = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_5622', port=3306)
    cursor = dbs.cursor()
    try:
        cursor.execute(sql)
        dbs.commit()
        dbs.close()
        return 1
    except:
        dbs.rollback()
        dbs.close()
        return 0


def read_file_exer(file_path):
    sql_lines = []
    with file(file_path, 'r') as f:
        data = f.readlines()
        for line in data:
            a = line.split()
            sql = 'INSERT INTO elec_5622.testmodel_exercise_monitor( \
            user_id, monitor_type,  diastolic, systolic,pulse) VALUES(\"%s\" , \"%s\" , \"%s\" , \"%s\" , \"%s\" );'%(a[0],a[1],a[2],a[3],a[4])
            sql_lines.append(sql)

    return '\r\n'.join(sql_lines)

def delete_exer(file_path):
    sql_lines = []
    with file(file_path, 'r') as f:
        data = f.readlines()
        for line in data:
            a = line.split()
            sql = 'DELETE FROM elec_5622.testmodel_exercise_monitor WHERE user_id = "%s" and monitor_type = "%s" ;'%(a[0],a[1])
            sql_lines.append(sql)
    return '\r\n'.join(sql_lines)

def exercise_monitor_db(file_path):
    sql_lines=delete_exer(file_path)
    db_execute_exer(sql_lines)
    sql_lines = read_file_exer(file_path)
    a = db_execute_exer(sql_lines)
    return a

exercise_monitor_db('data.txt')
