from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    aadhar = db.Column(db.String(20), nullable=False)
    mobile = db.Column(db.String(20), unique=True, nullable=False)
    gender = db.Column(db.String(16))
    location = db.Column(db.String(255))
    category = db.Column(db.String(32))  # waste_collector | recycler | public
    preferred_language = db.Column(db.String(8), default='en')
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)
    active = db.Column(db.Boolean, default=True)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)


class OTP(db.Model):
    __tablename__ = 'otps'
    id = db.Column(db.Integer, primary_key=True)
    mobile = db.Column(db.String(20), nullable=False)
    code = db.Column(db.String(8), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)


class MaterialRate(db.Model):
    __tablename__ = 'material_rates'
    id = db.Column(db.Integer, primary_key=True)
    material = db.Column(db.String(64), nullable=False)
    rate_per_kg = db.Column(db.Float, default=0.0)


class RecycledRecord(db.Model):
    __tablename__ = 'recycled_records'
    id = db.Column(db.Integer, primary_key=True)
    collector_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    kg = db.Column(db.Float, default=0.0)
    material = db.Column(db.String(64))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class RecyclerData(db.Model):
    __tablename__ = 'recycler_data'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    demand = db.Column(db.Boolean, default=False)
    location = db.Column(db.String(255))
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)


class EmissionHotspot(db.Model):
    __tablename__ = 'emission_hotspots'
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    traffic_density = db.Column(db.Integer, default=0)
    pollution_level = db.Column(db.Float, default=0.0)
    source_type = db.Column(db.String(50), nullable=False)  # e.g., 'traffic', 'industry', 'construction', 'high energy usage'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
