from datetime import datetime

from .block import Block
from database.database import create_table, save_block, load_blocks


class Blockchain:

    def __init__(self):
        create_table()

        self.chain = []

        saved_blocks = load_blocks()

        if saved_blocks:
            for row in saved_blocks:
                block = Block(
                    row[0],
                    row[1],
                    self.convert_data(row[2]),
                    row[3]
                )

                block.hash = row[4]
                self.chain.append(block)

        else:
            genesis_block = self.create_genesis_block()
            self.chain.append(genesis_block)
            save_block(genesis_block)

    def convert_data(self, data):
        import json

        try:
            return json.loads(data)
        except:
            return data

    def create_genesis_block(self):
        return Block(
            0,
            str(datetime.now()),
            "Genesis Block",
            "0"
        )

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, data):
        previous_block = self.get_latest_block()

        new_block = Block(
            len(self.chain),
            str(datetime.now()),
            data,
            previous_block.hash
        )

        self.chain.append(new_block)

        save_block(new_block)

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):

            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            if current_block.hash != current_block.calculate_hash():
                return False

            if current_block.previous_hash != previous_block.hash:
                return False

        return True