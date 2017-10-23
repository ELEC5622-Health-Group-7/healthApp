#coding=utf-8

import MySQLdb

def db_search(Sname,Spassword):
    dbs = MySQLdb.connect(host='localhost', user='root', passwd='Jinghan1', db='elec_5622', port=3306)
    cursor = dbs.cursor()

    query = "SELECT name,password,id FROM elec_5622.testmodel_user WHERE name='%s' " %(Sname)
    cursor.execute(query)
    results = cursor.fetchall()
    if results==():
        results = [('0', '0')]
    try:
        dbs.commit()
    except:
        dbs.rollback()
    dbs.close()
    user_name=results[0][0]
    password = results[0][1]
    user_id = results[0][2]
    if password==Spassword:
        print "welcome %s!"%(user_name)
        return [user_name,user_id]
    else:
        print "please register first"
        return ('0', '0')



#sql_lines = find_user('1')
name='3'
password='3'
db_search(name,password)