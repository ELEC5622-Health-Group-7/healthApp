#coding=utf-8

import MySQLdb

def db_execute_exer(sql):
    dbs = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_5622', port=3306)
    cursor = dbs.cursor()
    try:
        cursor.execute(sql)
        dbs.commit()
    except:
        dbs.rollback()
    dbs.close()


def read_file_exer(file_path):
    sql_lines = []
    f = open(file_path)
    s=f.read()
    a=s.split()
    sql_lines = "INSERT INTO elec_5622.testmodel_exercise_monitor( \
                user_id, monitor_type, diastolic, systolic,pulse) VALUES('%s','%s','%s','%s','%s');" \
          % (a[0], a[1], a[2], a[3], a[4])
    return sql_lines

def delete_old_exer(file_path):
    sql_lines = []
    f = open(file_path)
    s = f.read()
    a = s.split()

    sql_lines = "DELETE FROM elec_5622.testmodel_exercise_monitor WHERE user_id='%s'"%(a[0])
    return sql_lines

def exercise_monitor_db(file_path):

    sql_lines = "SET SQL_SAFE_UPDATES = 0"
    db_execute_exer(sql_lines)
    sql_lines = delete_old_exer(file_path)
    db_execute_exer(sql_lines)
    sql_lines = read_file_exer(file_path)
    db_execute_exer(sql_lines)
    return

