class Pose2d {
  constructor(translation, rotation, comment) {
    this.translation = translation;
    this.rotation = rotation;
    this.comment = comment || '';
  }

  static exp(delta) {
    const sin_theta = Math.sin(delta.dtheta);
    const cos_theta = Math.cos(delta.dtheta);
    let s,
      c;

    if (Math.abs(delta.dtheta) < kEps) {
      s = 1.0 - 1.0 / 6.0 * delta.dtheta * delta.dtheta;
      c = 0.5 * delta.dtheta;
    } else {
      s = sin_theta / delta.dtheta;
      c = (1.0 - cos_theta) / delta.dtheta;
    }

    return new Pose2d(new Translation2d(delta.dx * s - delta.dy * c, delta.dx * c + delta.dy * s),
      new Rotation2d(cos_theta, sin_theta, false));
  }

  static log(transform) {
    const dtheta = transform.getRotation().getRadians();
    const half_dtheta = 0.5 * dtheta;
    const cos_minus_one = transform.getRotation().cos() - 1.0;
    let halftheta_by_tan_of_halfdtheta;
    if (Math.abs(cos_minus_one) < kEps) {
      halftheta_by_tan_of_halfdtheta = 1.0 - 1.0 / 12.0 * dtheta * dtheta;
    } else {
      halftheta_by_tan_of_halfdtheta = -(half_dtheta * transform.getRotation().sin()) / cos_minus_one;
    }
    const translation_part = transform.getTranslation()
      .rotateBy(new Rotation2d(halftheta_by_tan_of_halfdtheta, -half_dtheta, false));
    return new Twist2d(translation_part.x(), translation_part.y(), dtheta);
  }

  get getTranslation() {
    return this.translation;
  }

  get getRotation() {
    return this.rotation;
  }

  transformBy(other) {
    return new Pose2d(this.translation.translateBy(other.translation.rotateBy(this.rotation)),
      this.rotation.rotateBy(other.rotation));
  }

  inverse() {
    const rotation_inverted = this.rotation.inverse();
    return new Pose2d(this.translation.inverse().rotateBy(rotation_inverted), rotation_inverted);
  }

  normal() {
    return new Pose2d(this.translation, this.rotation.normal());
  }

  interpolate(other, x) {
    if (x <= 0) {
      return new Pose2d(this.translation, this.rotation, this.comment);
    } if (x >= 1) {
      return new Pose2d(other.translation, other.rotation, other.comment);
    }
    const twist = Pose2d.log(this.inverse().transformBy(other));
    return this.transformBy(Pose2d.exp(twist.scaled(x)));
  }

  distance(other) {
    return Pose2d.log(this.inverse().transformBy(other)).norm();
  }

  heading(other) {
	    return Math.atan2(this.translation.y - other.translation.y, this.translation.x - other.translation.x);
  }

  draw(drawHeading, radius, ctx) {
    this.translation.draw(null, radius, ctx);

    if (!drawHeading) {
		    return;
    }

    const x = this.translation.drawX;
    const y = this.translation.drawY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25 * Math.cos(-this.rotation.getRadians()), y + 25 * Math.sin(-this.rotation.getRadians()));
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }

  toString() {
    return `new Pose2d(new Translation2d(${this.translation.x}, ${this.translation.y}), new Rotation2d(${this.rotation.cos}, ${this.rotation.sin}, ${this.rotation.normalize}))`;
  }

  transform(other) {
    other.position.rotate(this.rotation);
    this.translation.translate(other.translation);
    this.rotation.rotate(other.rotation);
  }
}

module.exports = Pose2d;
