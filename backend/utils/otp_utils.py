import random
from datetime import datetime, timedelta


def generate_otp(code_len: int = 6) -> str:
    return ''.join(str(random.randint(0, 9)) for _ in range(code_len))


def otp_expiry(minutes: int = 5) -> datetime:
    return datetime.utcnow() + timedelta(minutes=minutes)
