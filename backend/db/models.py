import os
from dotenv import load_dotenv
from supabase import create_client, Client
import time


def update_user_prefs(supabase: Client, user_id: str, prefs: dict):
    pass

def get_user_prefs(supabase: Client, user_id: str):
    pass


# Create a record
def create_record(user_id, chat_history):
    response = supabase.table("History").insert({
        "user_id": user_id,
        "chat_history": chat_history
    }).execute()
    return response.data

# Read all records
def read_records():
    response = supabase.table("History").select("*").execute()
    return response.data

# Update a record
def update_record(record_id, updated_data):
    response = supabase.table("History").update(updated_data).eq("id", record_id).execute()
    return response.data

# Delete a record
def delete_record(record_id):
    response = supabase.table("History").delete().eq("id", record_id).execute()
    return response.data

if __name__ == "__main__":
    load_dotenv()
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


    response = supabase.table("History").insert({
        "user_id": "22",
        "chat_history": {
            "11-28-2024 10:21": "Give okay something scary"
        }
    }).execute()

    print(response.data)

