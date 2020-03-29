from googlesearch import search
import pymysql
import time
import sys
import requests
####################################################
# Settings DataBase

DB_host = 'localhost'
DB_port = 3306
DB_user = 'python'
DB_password = '1234'
DB_db = 'python'

#####################################################


def db_connection(DB_host, DB_port, DB_user, DB_password, DB_db):
    try:
        conn = pymysql.connect(host=DB_host, port=DB_port, user=DB_user, passwd=DB_password, db=DB_db)
        cursor = conn.cursor()

        return cursor, conn
    except pymysql.err.OperationalError:
        print("Errore di connessione al DB")
        x = 0
        while x <= 2:
            print(f"Tentativo numero {x+1}")
            x += 1
            time.sleep(2)
        print("Errore di connessione")
        exit()


def ciclo(query, cursor, conn):
    caricamento = 0
    for sito in search(query, tld="it", num=10, stop=None, pause=2):
        cursor.execute(f"SELECT Indirizzo FROM SitiWeb WHERE Indirizzo='{sito}'")
        data = cursor.fetchone()
        if data is None:
            print("")
            print(f"Trovato sito: {sito}")
            sql = "INSERT INTO SitiWeb (Indirizzo) VALUES (%s)"
            cursor.execute(sql, sito)
            conn.commit()
        else:
            b = "Siti già esistenti: " + str(caricamento)
            sys.stdout.write('\r' + b)
            sys.stdout.flush()
            caricamento = caricamento + 1
            pass


lista_siti = ["Free Proxy list", "Proxy List", "Proxy List for free"]
cursor, conn = db_connection(DB_host, DB_port, DB_user, DB_password, DB_db)
for query in lista_siti:
    ciclo(query, cursor, conn)
    time.sleep(0.5)


