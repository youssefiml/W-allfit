// src/pages/Community.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import Message from "../components/Message";
import GradientButton from "../components/forms/GradientButton";
import FloatingInput from "../components/forms/FloatingInput";
import {
  FlowerIcon,
  SparkleIcon,
  CheckIcon,
  FitnessIcon,
  WeightLiftingIcon,
} from "../components/icons/Icons";

export default function Community() {
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "groups"
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [content, setContent] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupForm, setGroupForm] = useState({ name: "", description: "" });

  const fetchPosts = async (groupId = null) => {
    try {
      setLoading(true);
      const url = groupId
        ? `/community/posts?groupId=${groupId}`
        : "/community/posts";
      const res = await api.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error fetching posts",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await api.get("/community/groups");
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error fetching groups",
      });
    }
  };

  useEffect(() => {
    fetchPosts(selectedGroup?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup]);

  useEffect(() => {
    fetchPosts();
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage({ type: "error", text: "Please enter some content" });
      return;
    }

    setPosting(true);
    try {
      await api.post("/community/posts", {
        content,
        groupId: selectedGroup?._id || null,
        isQuestion,
      });
      setContent("");
      setIsQuestion(false);
      setMessage({ type: "success", text: "Post created successfully!" });
      fetchPosts(selectedGroup?._id);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error creating post",
      });
    } finally {
      setPosting(false);
    }
  };

  const handleReply = async (postId) => {
    if (!replyContent.trim()) {
      setMessage({ type: "error", text: "Please enter a reply" });
      return;
    }

    setReplying(true);
    try {
      await api.post(`/community/posts/${postId}/reply`, {
        content: replyContent,
      });
      setReplyContent("");
      setReplyingTo(null);
      setMessage({ type: "success", text: "Reply posted successfully!" });
      fetchPosts(selectedGroup?._id);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error posting reply",
      });
    } finally {
      setReplying(false);
    }
  };


  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupForm.name.trim()) {
      setMessage({ type: "error", text: "Group name is required" });
      return;
    }

    try {
      await api.post("/community/groups", groupForm);
      setGroupForm({ name: "", description: "" });
      setShowCreateGroup(false);
      setMessage({ type: "success", text: "Group created successfully!" });
      fetchGroups();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error creating group",
      });
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await api.post(`/community/groups/${groupId}/join`);
      setMessage({ type: "success", text: "Joined group successfully!" });
      fetchGroups();
      if (selectedGroup?._id === groupId) {
        const res = await api.get(`/community/groups/${groupId}`);
        setSelectedGroup(res.data);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error joining group",
      });
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await api.post(`/community/groups/${groupId}/leave`);
      setMessage({ type: "success", text: "Left group successfully!" });
      fetchGroups();
      if (selectedGroup?._id === groupId) {
        setSelectedGroup(null);
        fetchPosts();
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Error leaving group",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const getUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const isUserMember = (group) => {
    if (!group.members) return false;
    const userId = getUserId();
    if (!userId) return false;
    return group.members.some(
      (member) => member._id === userId || member === userId
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
          duration={message.type === "success" ? 3000 : 5000}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FlowerIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Women's Wellness Community
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Connect, share, and grow together. Join groups, ask questions, and
            support each other on your wellness journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setActiveTab("posts");
              setSelectedGroup(null);
            }}
            className={`px-6 py-3 font-semibold transition-colors duration-300 border-b-2 ${
              activeTab === "posts"
                ? "border-pink-500 text-pink-500"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Posts & Discussions
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-6 py-3 font-semibold transition-colors duration-300 border-b-2 ${
              activeTab === "groups"
                ? "border-pink-500 text-pink-500"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Groups
          </button>
        </div>

        {/* Selected Group Banner */}
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FitnessIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedGroup.name}</h3>
                  <p className="text-sm text-pink-100">
                    {selectedGroup.members?.length || 0} members
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                View All Posts
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <SparkleIcon className="w-5 h-5 text-pink-500" />
                  {selectedGroup
                    ? `Post in ${selectedGroup.name}`
                    : "Create a Post"}
                </h2>
                <form onSubmit={handlePost} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isQuestion}
                        onChange={(e) => setIsQuestion(e.target.checked)}
                        className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Ask a Question
                      </span>
                    </label>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={
                      isQuestion
                        ? "What would you like to ask the community?"
                        : "Share your thoughts, experiences, or ask for advice..."
                    }
                    rows={4}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                  <div className="flex justify-end">
                    <GradientButton
                      type="submit"
                      loading={posting}
                      disabled={posting || !content.trim()}
                    >
                      {isQuestion ? "Ask Question" : "Post"}
                    </GradientButton>
                  </div>
                </form>
              </motion.div>

              {/* Posts List */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading posts...
                  </p>
                </div>
              ) : posts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FlowerIcon className="w-8 h-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Be the first to share something with the community!
                  </p>
                </motion.div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {post.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {post.user?.name || "Unknown"}
                          </h3>
                          {post.isQuestion && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded">
                              Question
                            </span>
                          )}
                          {post.group && (
                            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold rounded">
                              {post.group.name}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words mb-4">
                          {post.content}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mb-4">
                          <button
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === post._id ? null : post._id
                              )
                            }
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span>💬</span>
                            <span className="text-sm font-medium">
                              {post.replies?.length || 0} replies
                            </span>
                          </button>
                        </div>

                        {/* Reply Form */}
                        {replyingTo === post._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              rows={2}
                              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none mb-2"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent("");
                                }}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleReply(post._id)}
                                disabled={replying || !replyContent.trim()}
                                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {replying ? "Replying..." : "Reply"}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Replies */}
                        {post.replies && post.replies.length > 0 && (
                          <div className="mt-4 space-y-3 pl-4 border-l-2 border-pink-200 dark:border-pink-800">
                            {post.replies.map((reply, replyIndex) => (
                              <div
                                key={replyIndex}
                                className="flex items-start gap-3 pt-3"
                              >
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">
                                    {reply.user?.name?.charAt(0).toUpperCase() ||
                                      "U"}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                      {reply.user?.name || "Unknown"}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDate(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Sidebar - Groups */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Groups
                  </h3>
                  <button
                    onClick={() => setShowCreateGroup(!showCreateGroup)}
                    className="px-3 py-1.5 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    + Create
                  </button>
                </div>

                {/* Create Group Form */}
                <AnimatePresence>
                  {showCreateGroup && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleCreateGroup}
                      className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
                    >
                      <FloatingInput
                        type="text"
                        label="Group Name"
                        value={groupForm.name}
                        onChange={(e) =>
                          setGroupForm({ ...groupForm, name: e.target.value })
                        }
                        required
                      />
                      <textarea
                        value={groupForm.description}
                        onChange={(e) =>
                          setGroupForm({
                            ...groupForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description (optional)"
                        rows={2}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateGroup(false);
                            setGroupForm({ name: "", description: "" });
                          }}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* All Posts Button */}
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`w-full mb-4 p-3 rounded-lg text-left transition-colors ${
                    !selectedGroup
                      ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <WeightLiftingIcon className="w-5 h-5" />
                    <span className="font-medium">All Posts</span>
                  </div>
                </button>

                {/* Groups List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {groups.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No groups yet. Create one!
                    </p>
                  ) : (
                    groups.map((group) => {
                      const isMember = isUserMember(group);
                      return (
                        <div
                          key={group._id}
                          className={`p-3 rounded-lg border transition-colors ${
                            selectedGroup?._id === group._id
                              ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div
                              className="flex-1 cursor-pointer"
                              onClick={() => setSelectedGroup(group)}
                            >
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {group.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {group.members?.length || 0} members
                              </p>
                            </div>
                          </div>
                          {isMember ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedGroup(group)}
                                className="flex-1 px-3 py-1.5 bg-pink-500 text-white text-xs rounded-lg hover:bg-pink-600 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleLeaveGroup(group._id)}
                                className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                              >
                                Leave
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleJoinGroup(group._id)}
                              className="w-full px-3 py-1.5 bg-pink-500 text-white text-xs rounded-lg hover:bg-pink-600 transition-colors"
                            >
                              Join Group
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create Group Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white min-h-[200px] flex flex-col justify-center items-center cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setShowCreateGroup(true)}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <SparkleIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create New Group</h3>
              <p className="text-pink-100 text-sm text-center">
                Start a community around a topic you're passionate about
              </p>
            </motion.div>

            {/* Groups Grid */}
            {groups.map((group, index) => {
              const isMember = isUserMember(group);
              return (
                <motion.div
                  key={group._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <FitnessIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {group.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {group.description || "No description"}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <CheckIcon className="w-4 h-4" />
                      <span>{group.members?.length || 0} members</span>
                    </div>
                    {isMember && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded">
                        Member
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {isMember ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedGroup(group);
                            setActiveTab("posts");
                          }}
                          className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          View Group
                        </button>
                        <button
                          onClick={() => handleLeaveGroup(group._id)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                          Leave
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleJoinGroup(group._id)}
                        className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Join Group
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Create Group Modal (when clicked from Groups tab) */}
        {activeTab === "groups" && showCreateGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Create New Group
              </h2>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <FloatingInput
                  type="text"
                  label="Group Name"
                  value={groupForm.name}
                  onChange={(e) =>
                    setGroupForm({ ...groupForm, name: e.target.value })
                  }
                  required
                />
                <textarea
                  value={groupForm.description}
                  onChange={(e) =>
                    setGroupForm({
                      ...groupForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description (optional)"
                  rows={4}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                />
                <div className="flex gap-3">
                  <GradientButton type="submit">Create Group</GradientButton>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateGroup(false);
                      setGroupForm({ name: "", description: "" });
                    }}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
