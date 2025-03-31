import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaUserPlus,
  FaImage,
  FaTrophy,
  FaFileUpload,
  FaImages,
  FaAward,
  FaFileAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserMinus,
  FaUsers,
} from "react-icons/fa";

function AdminPanel() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [achievementImage, setAchievementImage] = useState(null);
  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementDescription, setAchievementDescription] = useState("");
  const [achievementYear, setAchievementYear] = useState("");
  const [achievementMonth, setAchievementMonth] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [teamMemberData, setTeamMemberData] = useState({
    name: "",
    email: "",
    linkedin_url: "",
    team: "",
    designation: "",
  });
  const [teamMemberImage, setTeamMemberImage] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      if (!storedToken || !storedRole) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://172.16.3.23:5000/api/auth/verify-token",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (!response.data.valid) {
          throw new Error("Invalid token");
        }

        setToken(storedToken);
        setRole(storedRole);
        const decodedToken = jwtDecode(storedToken);
        setUserId(decodedToken.id);

        await fetchInitialData(storedToken, storedRole);
      } catch (err) {
        console.error("Auth verification failed:", err);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  const fetchInitialData = async (token, role) => {
    try {
      await fetchFiles(token);
      if (role === "superadmin") {
        await Promise.all([
          fetchGalleryImages(token),
          fetchAchievements(token),
          fetchAdmins(token),
          fetchTeamMembers(token),
        ]);
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setMessage("Failed to load initial data");
    }
  };

  const fetchFiles = async (token) => {
    try {
      const response = await axios.get("https://172.16.3.23:5000/api/file", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(response.data);
    } catch (err) {
      setMessage("Failed to fetch files");
    }
  };

  const fetchGalleryImages = async (token) => {
    try {
      const response = await axios.get("https://172.16.3.23:5000/api/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryImages(response.data);
    } catch (err) {
      setMessage("Failed to fetch gallery images");
    }
  };

  const fetchAchievements = async (token) => {
    try {
      const response = await axios.get(
        "https://172.16.3.23:5000/api/achievement",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAchievements(response.data);
    } catch (err) {
      setMessage("Failed to fetch achievements");
    }
  };

  const fetchAdmins = async (token) => {
    try {
      const response = await axios.get("https://172.16.3.23:5000/api/admin/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (err) {
      setMessage("Failed to fetch admins");
    }
  };

  const fetchTeamMembers = async (token) => {
    try {
      const response = await axios.get("https://172.16.3.23:5000/api/team", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers(response.data);
    } catch (err) {
      setMessage("Failed to fetch team members");
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/admin/add",
        { username: newAdminUsername, password: newAdminPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setNewAdminUsername("");
      setNewAdminPassword("");
      setActiveModal(null);
      fetchAdmins(token);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(", ");
        setMessage(errorMessages);
      } else {
        setMessage(err.response?.data?.message || "Failed to add admin");
      }
    }
  };

  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", galleryImage);
    formData.append("title", galleryTitle);

    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/gallery/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setGalleryImage(null);
      setGalleryTitle("");
      fetchGalleryImages(token);
      setActiveModal(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to upload gallery image";
      console.error("Error uploading gallery image:", {
        message: errorMessage,
        status: err.response?.status,
        response: err.response?.data,
      });
      setMessage(errorMessage);
    }
  };

  const handleAchievementUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", achievementImage);
    formData.append("title", achievementTitle);
    formData.append("description", achievementDescription);
    formData.append("year", achievementYear);
    formData.append("month", achievementMonth);

    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/achievement/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setAchievementImage(null);
      setAchievementTitle("");
      setAchievementDescription("");
      setAchievementYear("");
      setAchievementMonth("");
      fetchAchievements(token);
      setActiveModal(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to upload achievement";
      console.error("Error uploading achievement:", {
        message: errorMessage,
        status: err.response?.status,
        response: err.response?.data,
      });
      setMessage(errorMessage);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", fileTitle);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setFileTitle("");
      setFile(null);
      fetchFiles(token);
      setActiveModal(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to upload file";
      console.error("Error uploading file:", {
        message: errorMessage,
        status: err.response?.status,
        response: err.response?.data,
      });
      setMessage(errorMessage);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamMemberData.name);
    formData.append("email", teamMemberData.email);
    formData.append("linkedin_url", teamMemberData.linkedin_url);
    formData.append("team", teamMemberData.team);
    formData.append("designation", teamMemberData.designation);
    formData.append("image", teamMemberImage);

    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/team/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setTeamMemberData({
        name: "",
        email: "",
        linkedin_url: "",
        team: "",
        designation: "",
      });
      setTeamMemberImage(null);
      fetchTeamMembers(token);
      setActiveModal(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to add team member";
      console.error("Error adding team member:", {
        message: errorMessage,
        status: err.response?.status,
        response: err.response?.data,
      });
      setMessage(errorMessage);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    try {
      await axios.delete(`https://172.16.3.23:5000/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Gallery image deleted successfully");
      fetchGalleryImages(token);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to delete gallery image"
      );
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      await axios.delete(`https://172.16.3.23:5000/api/achievement/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Achievement deleted successfully");
      fetchAchievements(token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete achievement");
    }
  };

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`https://172.16.3.23:5000/api/file/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("File deleted successfully");
      fetchFiles(token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete file");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`https://172.16.3.23:5000/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Admin deleted successfully");
      fetchAdmins(token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete admin");
    }
  };

  const handleDeleteTeamMember = async (id) => {
    try {
      await axios.delete(`https://172.16.3.23:5000/api/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Team member deleted successfully");
      fetchTeamMembers(token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete team member");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    setMessage("Logged out successfully");
    navigate("/login");
  };

  const confirmDelete = (action, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      action(id);
    }
  };

  const allMenuItems = [
    ...(role === "superadmin"
      ? [
          {
            id: "add-admin",
            label: "Add Admin",
            icon: <FaUserPlus className="text-3xl" />,
          },
          {
            id: "delete-admin",
            label: "Delete Admin",
            icon: <FaUserMinus className="text-3xl" />,
          },
          {
            id: "add-team-member",
            label: "Add Team Member",
            icon: <FaUsers className="text-3xl" />,
          },
          {
            id: "manage-team-members",
            label: "Manage Team Members",
            icon: <FaUsers className="text-3xl" />,
          },
        ]
      : []),
    {
      id: "upload-gallery",
      label: "Upload Gallery Photo",
      icon: <FaImage className="text-3xl" />,
      superadminOnly: true,
    },
    {
      id: "upload-achievement",
      label: "Upload Achievement",
      icon: <FaTrophy className="text-3xl" />,
      superadminOnly: true,
    },
    {
      id: "upload-file",
      label: "Upload File",
      icon: <FaFileUpload className="text-3xl" />,
    },
    {
      id: "manage-gallery",
      label: "Manage Gallery Photos",
      icon: <FaImages className="text-3xl" />,
      superadminOnly: true,
    },
    {
      id: "manage-achievements",
      label: "Manage Achievements",
      icon: <FaAward className="text-3xl" />,
      superadminOnly: true,
    },
    {
      id: "uploaded-files",
      label: "Uploaded Files",
      icon: <FaFileAlt className="text-3xl" />,
    },
  ];

  const menuItems = allMenuItems.filter(
    (item) => !item.superadminOnly || role === "superadmin"
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-lg text-emerald-800">
            Loading Admin Panel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <nav className="bg-emerald-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Role: {role}</span>
          {/* <button
            onClick={handleLogout}
            className="flex items-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button> */}
        </div>
      </nav>

      <div className="flex-1 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-50 transition-all duration-300"
              onClick={() => setActiveModal(item.id)}
            >
              <div className="text-emerald-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-emerald-900">
                {item.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-2xl" />
              </button>

              {message && (
                <p
                  className={`mb-6 text-center p-3 rounded-lg ${
                    message.includes("successfully")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}

              {activeModal === "add-admin" && role === "superadmin" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Add New Admin
                  </h3>
                  <form onSubmit={handleAddAdmin} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={newAdminUsername}
                        onChange={(e) => setNewAdminUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300"
                    >
                      Add Admin
                    </motion.button>
                  </form>
                </div>
              )}

              {activeModal === "delete-admin" && role === "superadmin" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Delete Admin
                  </h3>
                  {admins.length === 0 ? (
                    <p className="text-gray-500">
                      No admins available to delete.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {admins.map((admin) => (
                        <li
                          key={admin.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                        >
                          <span className="text-gray-700">
                            {admin.username}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              confirmDelete(handleDeleteAdmin, admin.id)
                            }
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                          >
                            Delete
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeModal === "add-team-member" && role === "superadmin" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Add Team Member
                  </h3>
                  <form onSubmit={handleAddTeamMember} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={teamMemberData.name}
                        onChange={(e) =>
                          setTeamMemberData({
                            ...teamMemberData,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={teamMemberData.email}
                        onChange={(e) =>
                          setTeamMemberData({
                            ...teamMemberData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={teamMemberData.linkedin_url}
                        onChange={(e) =>
                          setTeamMemberData({
                            ...teamMemberData,
                            linkedin_url: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Team
                      </label>
                      <select
                        value={teamMemberData.team}
                        onChange={(e) =>
                          setTeamMemberData({
                            ...teamMemberData,
                            team: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      >
                        <option value="">Select Team</option>
                        <option value="Faculty Team">Faculty Team</option>
                        <option value="Core Team">Core Team</option>
                        <option value="Spons Team">Spons Team</option>
                        <option value="Web Dev Team">Web Dev Team</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={teamMemberData.designation}
                        onChange={(e) =>
                          setTeamMemberData({
                            ...teamMemberData,
                            designation: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setTeamMemberImage(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all duration-300"
                        accept="image/*"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300"
                    >
                      Add Team Member
                    </motion.button>
                  </form>
                </div>
              )}

              {activeModal === "manage-team-members" &&
                role === "superadmin" && (
                  <div>
                    <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                      Manage Team Members
                    </h3>
                    {teamMembers.length === 0 ? (
                      <p className="text-gray-500">
                        No team members available.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {teamMembers.map((member) => (
                          <li
                            key={member.id}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                          >
                            <div>
                              <span className="text-gray-700 font-medium">
                                {member.name}
                              </span>
                              <p className="text-gray-600">
                                {member.designation}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {member.team}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                confirmDelete(handleDeleteTeamMember, member.id)
                              }
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

              {activeModal === "upload-gallery" && role === "superadmin" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Upload Gallery Photo
                  </h3>
                  <form onSubmit={handleGalleryUpload} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setGalleryImage(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all duration-300"
                        accept="image/*"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300"
                    >
                      Upload
                    </motion.button>
                  </form>
                </div>
              )}

              {activeModal === "upload-achievement" &&
                role === "superadmin" && (
                  <div>
                    <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                      Upload Achievement
                    </h3>
                    <form
                      onSubmit={handleAchievementUpload}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={achievementTitle}
                          onChange={(e) => setAchievementTitle(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Description
                        </label>
                        <textarea
                          value={achievementDescription}
                          onChange={(e) =>
                            setAchievementDescription(e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                          rows="4"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Year
                        </label>
                        <input
                          type="number"
                          value={achievementYear}
                          onChange={(e) => setAchievementYear(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                          min="1900"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Month
                        </label>
                        <select
                          value={achievementMonth}
                          onChange={(e) => setAchievementMonth(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select Month</option>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Attachment
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setAchievementImage(e.target.files[0])
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all duration-300"
                          accept="image/*,application/pdf"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300"
                      >
                        Upload
                      </motion.button>
                    </form>
                  </div>
                )}

              {activeModal === "upload-file" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Upload File
                  </h3>
                  <form onSubmit={handleFileUpload} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={fileTitle}
                        onChange={(e) => setFileTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        File
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all duration-300"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300"
                    >
                      Upload
                    </motion.button>
                  </form>
                </div>
              )}

              {activeModal === "manage-gallery" && role === "superadmin" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Manage Gallery Photos
                  </h3>
                  {galleryImages.length === 0 ? (
                    <p className="text-gray-500">
                      No gallery images available.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {galleryImages.map((image) => (
                        <li
                          key={image.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                        >
                          <span className="text-gray-700">
                            {image.title || "Untitled"}
                          </span>
                          {role === "superadmin" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                confirmDelete(
                                  handleDeleteGalleryImage,
                                  image.id
                                )
                              }
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeModal === "manage-achievements" &&
                role === "superadmin" && (
                  <div>
                    <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                      Manage Achievements
                    </h3>
                    {achievements.length === 0 ? (
                      <p className="text-gray-500">
                        No achievements available.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {achievements.map((achievement) => (
                          <li
                            key={achievement.id}
                            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-gray-700 font-medium">
                                  {achievement.title || "Untitled"}
                                </span>
                                <p className="text-gray-600">
                                  {achievement.description}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {achievement.month} {achievement.year}
                                </p>
                              </div>
                              {role === "superadmin" && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    confirmDelete(
                                      handleDeleteAchievement,
                                      achievement.id
                                    )
                                  }
                                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                                >
                                  Delete
                                </motion.button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

              {activeModal === "uploaded-files" && (
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6">
                    Uploaded Files
                  </h3>
                  {files.length === 0 ? (
                    <p className="text-gray-500">No files available.</p>
                  ) : (
                    <ul className="space-y-4">
                      {files.map((file) => (
                        <li
                          key={file.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                        >
                          <div>
                            <a
                              href={`https://172.16.3.23:5000${file.file_url}`}
                              className="text-emerald-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.title || file.file_name}
                            </a>
                            <p className="text-gray-500 text-sm">
                              Type: {file.file_type}
                            </p>
                          </div>
                          {(role === "superadmin" ||
                            file.admin_id === userId) && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                confirmDelete(handleDeleteFile, file.id)
                              }
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      <footer className="bg-emerald-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Bioengene. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminPanel;
