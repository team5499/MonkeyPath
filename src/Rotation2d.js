const kEps = 1E-9;

class Rotation2d {
	constructor(x, y, normalize) {
        this.cos = x;
        this.sin = y;
        this.normalize = normalize;
        if (normalize) {
            this.normalizeFunc();
        }
    }

    static fromRadians(angle_radians) {
        return new Rotation2d(Math.cos(angle_radians), Math.sin(angle_radians), false);
    }

    static fromDegrees(angle_degrees) {
        return this.fromRadians(d2r(angle_degrees));
    }

    normalizeFunc() {
        let magnitude = Math.hypot(this.cos, this.sin);
        if (magnitude > kEps) {
            this.cos /= magnitude;
            this.sin /= magnitude;
        } else {
            this.sin = 0;
            this.cos = 1;
        }
    }

    tan() {
        if (Math.abs(this.cos) < kEps) {
            if (this.sin >= 0.0) {
                return Number.POSITIVE_INFINITY;
            } else {
                return Number.NEGATIVE_INFINITY;
            }
        }
        return this.sin / this.cos;
    }

    getRadians() {
        return Math.atan2(this.sin, this.cos);
    }

    getDegrees() {
        return r2d(this.getRadians());
    }

    rotateBy(other) {
        return new Rotation2d(this.cos * other.cos - this.sin * other.sin,
                this.cos * other.sin + this.sin * other.cos, true);
    }

    normal() {
        return new Rotation2d(-this.sin, this.cos, false);
    }

    inverse() {
        return new Rotation2d(this.cos, -this.sin, false);
    }

    interpolate(other, x) {
        if (x <= 0) {
            return new Rotation2d(this.cos, this.sin, this.normalize);
        } else if (x >= 1) {
            return new Rotation2d(other.cos, other.sin, other.normalize);
        }
        let angle_diff = this.inverse().rotateBy(other).getRadians();
        return this.rotateBy(Rotation2d.fromRadians(angle_diff * x));
    }

    distance(other) {
        return this.inverse().rotateBy(other).getRadians();
    }
}

module.exports = Rotation2d;
