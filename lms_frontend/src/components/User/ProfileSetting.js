import { Link } from 'react-router-dom';
import Sidebar from './SideBar';

function ProfileSetting() {
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
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <form>

                {/* Full Name */}
                <div className="mb-3 row">
                  <label htmlFor="fullName" className="col-sm-2 col-form-label">
                    Full Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3 row">
                  <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="email@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-3 row">
                  <div className="col-sm-10 offset-sm-2">
                    <button type="submit" className="btn btn-primary">
                      Update Profile
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

export default ProfileSetting;
