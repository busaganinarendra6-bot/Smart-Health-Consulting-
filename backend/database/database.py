import sqlite3
import json


DATABASE = "backend/database/health.db"


def get_connection():
    return sqlite3.connect(DATABASE)


def create_table():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS blockchain (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_index INTEGER,
            timestamp TEXT,
            data TEXT,
            previous_hash TEXT,
            hash TEXT
        )
    """)

    connection.commit()
    connection.close()


def save_block(block):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO blockchain
        (block_index, timestamp, data, previous_hash, hash)
        VALUES (?, ?, ?, ?, ?)
    """, (
        block.index,
        block.timestamp,
        json.dumps(block.data),
        block.previous_hash,
        block.hash
    ))

    connection.commit()
    connection.close()


def load_blocks():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT block_index, timestamp, data, previous_hash, hash
        FROM blockchain
        ORDER BY block_index
    """)

    rows = cursor.fetchall()

    connection.close()

    return rows