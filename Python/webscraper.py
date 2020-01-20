from urllib.request import Request, urlopen, urlretrieve
import urllib.request
import urllib.error
import pymysql
import re
from random_words import RandomWords
import os
import shutil
import time


# Settings DataBase
DB_host = 'localhost'
DB_port = 3306
DB_user = 'python'
DB_password = '1234'
DB_db = 'python'


def db_updateid(cursor, conn, id):
    sql = "UPDATE id SET ID=%s+1"
    cursor.execute(sql, id)
    conn.commit()


def connessionesito(sito, txt):
    try:
        req = Request(sito, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as risposta, open(txt, 'wb') as file_txt:
            shutil.copyfileobj(risposta, file_txt)
            return True
    except urllib.error.HTTPError:
        return False
    except urllib.error.URLError:
        return False


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
        print("Errore di connessione al db")
        exit()


def Db_EliminaSito(conn, cursor, sito, id):
    print("Eliminazione")
    WebScartati = "INSERT INTO sitiwebscartati (Sito) VALUES (%s)"
    cursor.execute(WebScartati, sito)
    SitiWeb = "DELETE FROM sitiweb WHERE ID=%s"
    cursor.execute(SitiWeb, id)
    conn.commit()


def Db_AggiungiSito(conn, cursor, x, id):
    sql = "INSERT INTO webscraping (IP) VALUES (%s)"
    cursor.execute(sql, x)
    conn.commit()
    sql = "UPDATE id SET ID=%s+1"
    cursor.execute(sql, id)
    conn.commit()


def creazione_testo(txt):
    try:
        with open(txt, 'r', encoding='utf8', errors='ignore') as txt:
            testo = txt.readlines()
            return testo
    except FileNotFoundError:
        time.sleep(0.3)
        tentativi = 0
        while tentativi <= 2:
            print(f"File di testo non trovato tentativi: {tentativi + 1}")
            connessionesito(sito, txt)
            tentativi += 1
            time.sleep(0.8)
        pass


def check_ip_def(cursor, ip):
    cursor.execute(f"SELECT IP FROM webscraping WHERE IP='{ip}'")
    data = cursor.fetchone()
    print(f"check data: {data}")
    if data is None:
        return True
    elif data[0] is None:
        return True
    else:
        return False


def main():
    file = RandomWords()
    cursor, conn = db_connection(DB_host, DB_port, DB_user, DB_password, DB_db)
    while True:
        sito_cache = 0
        ip_arr = []
        cursor.execute(f"SELECT ID FROM ID")
        data = cursor.fetchone()
        id = data[0]
        cursor.execute(f"SELECT ID, Indirizzo FROM sitiweb WHERE ID={id}")
        dati = cursor.fetchone()
        sito = dati[1]
        id = dati[0]
        print(f"Check Sito: {sito} {id}")
        txt = file.random_word() + ".txt"
        cache = txt
        check = connessionesito(sito, txt)
        if check is True:
            if sito_cache == 0:
                testo = creazione_testo(txt)
                re_ip = re.compile(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}")
                sito_cache = 1
                for linea in testo:
                    ip = re.findall(re_ip, linea)
                    for x in ip:
                        check_ip = check_ip_def(cursor, x)
                        if check_ip is True:
                            print(f"ip: {x}")
                            Db_AggiungiSito(conn, cursor, x, id)
                            sito_cache = 0
                        else:
                            print("ip già esistente")
                            sito_cache = 0
                            pass
                print(f"Check sito_cache: {sito_cache}")
                if sito_cache == 1:
                    db_updateid(cursor, conn, id)
                    Db_EliminaSito(conn, cursor, sito, id)
                    sito_cache = 0
                    try:
                        print(cache)
                        os.remove(cache)
                    except FileNotFoundError:
                        print("File non trovato")
                else:
                    try:
                        db_updateid(cursor, conn, id)
                        print(cache)
                        os.remove(cache)
                    except FileNotFoundError:
                        print("File non trovato(Scartare)")
        else:
            try:
                db_updateid(cursor, conn, id)
                Db_EliminaSito(conn, cursor, sito, id)
                print(cache)
                os.remove(cache)
            except FileNotFoundError:
                print("File non trovato(Scartare)")


if __name__ == '__main__':
    main()
