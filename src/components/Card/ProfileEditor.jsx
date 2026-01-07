import React, { useState } from "react"

export default function ProfileEditor() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border rounded-md hover:bg-gray-100"
      >
        Edit Profile
      </button>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue="John Doe"
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="job" className="block text-sm font-medium">
                  Job Title
                </label>
                <input
                  id="job"
                  type="text"
                  placeholder="Frontend Developer"
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">
                  Biography
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  defaultValue="Passionate about building UI with React and TailwindCSS 🚀"
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
