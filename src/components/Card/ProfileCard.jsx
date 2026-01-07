import React from "react"

export default function ProfileCard() {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-md border bg-white">
      {/* Cover */}
      <div className="relative h-32 w-full">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80"
          alt="Cover"
          className="h-full w-full object-cover"
          height={'100px'}
        />
        <div className="absolute -bottom-10 left-4">
          <img
            src="https://github.com/shadcn.png"
            alt="Avatar"
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
            height={'100px'}
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pt-12 pb-6 text-center">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-gray-500 text-sm">Frontend Developer</p>
        <p className="mt-2 text-sm text-gray-600">
          Passionate about building UI with React and TailwindCSS 🚀
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button className="px-4 py-1 text-sm border rounded-md hover:bg-gray-100">
            Follow
          </button>
          <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Message
          </button>
        </div>
      </div>
    </div>
  )
}
