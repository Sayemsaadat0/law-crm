"use client";

interface ProfilePreviewProps {
  user: {
    name: string;
    email: string;
    phone: string;
    joiningDate: string;
    role: string;
    thumbnail: string;
  };
}

export default function ProfilePreview({ user }: ProfilePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Thumbnail and Name */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={user.thumbnail}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Phone</span>
          <span className="text-sm text-gray-900">{user.phone}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Joining Date</span>
          <span className="text-sm text-gray-900">{user.joiningDate}</span>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-medium text-gray-700">Role</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-purple-100 text-purple-800 border-purple-200">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}

