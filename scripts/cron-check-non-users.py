"""
Cron script (to be run daily) that marks waste collectors as inactive if they haven't used the portal within 7 days.
This is a simple placeholder: in production, you'd have login/activity logs to check.
"""
from datetime import datetime, timedelta
from backend.server import create_app
from backend.models import db, User


def run_check(db_file=None):
    app = create_app('sqlite:///' + (db_file or 'backend/waste_management.db'))
    with app.app_context():
        threshold = datetime.utcnow() - timedelta(days=7)
        # Mark waste collectors inactive if last_active is older than threshold
        collectors = User.query.filter(User.category == 'waste_collector').all()
        for c in collectors:
            if not c.last_active or c.last_active < threshold:
                c.active = False
        db.session.commit()


if __name__ == '__main__':
    run_check()
