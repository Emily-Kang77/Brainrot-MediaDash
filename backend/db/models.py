import os
from dotenv import load_dotenv
from supabase import create_client, Client


def update_user_prefs(supabase: Client, user_id: str, prefs: dict):
    pass

def get_user_prefs(supabase: Client, user_id: str):
    pass


if __name__ == "__main__":
    load_dotenv()
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
