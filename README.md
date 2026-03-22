# Waste Management System

Minimal prototype for the Waste Management portals (Waste Collector, Recycler, Public).

Quick start (Windows / PowerShell):

1. Create and activate a virtual environment (optional but recommended):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the backend server:

```powershell
python backend/server.py
```

3. Open the frontend pages in your browser from the `frontend/` folder (open the `.html` files).

Notes:
- This is a minimal prototype. Replace OTP sending with a real SMS provider for production.
- The scheduler to mark inactive waste collectors is provided as a script in `scripts/`.
