import { Link } from 'react-router-dom';
import Sidebar from './SideBar';

function ChangePassword() {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar Section */}
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        {/* Main Content Section */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <form>

                {/* Current Password */}
                <div className="mb-3 row">
                  <label htmlFor="currentPassword" className="col-sm-3 col-form-label">
                    Current Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-3 row">
                  <label htmlFor="newPassword" className="col-sm-3 col-form-label">
                    New Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="mb-3 row">
                  <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
                    Confirm Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-3 row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="submit" className="btn btn-primary">
                      Change Password
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;
