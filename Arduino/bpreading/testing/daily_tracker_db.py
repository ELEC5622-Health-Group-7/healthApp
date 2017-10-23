#coding=utf-8

import MySQLdb

def db_execute_dai(sql):
    dbs = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_5622', port=3306)
    cursor = dbs.cursor()
    try:
        cursor.execute(sql)
        dbs.commit()
    except:
        dbs.rollback()
    dbs.close()


def read_file_dai(file_path):
    sql_lines = []
    f = open(file_path)
    s=f.read()
    a=s.split()
    sql_lines = "INSERT INTO elec_5622.testmodel_daily_tracker( \
                user_id, time, diastolic, systolic,pulse) VALUES('%s','%s','%s','%s','%s');" \
          % (a[0], a[1], a[2], a[3], a[4])
    return sql_lines


def delete_old_dai(file_path):
    sql_lines = []
    f = open(file_path)
    s = f.read()
    a = s.split()

    sql_lines = "DELETE FROM elec_5622.testmodel_daily_tracker WHERE time='%s'"%(a[1])
    return sql_lines

def daily_tracker_db(file_path):

    sql_lines = "SET SQL_SAFE_UPDATES = 0"
    db_execute_dai(sql_lines)
    sql_lines = delete_old_dai(file_path)
    db_execute_dai(sql_lines)
    sql_lines = read_file_dai(file_path)
    db_execute_dai(sql_lines)
    return