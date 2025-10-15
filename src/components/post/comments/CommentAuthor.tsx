import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/lib/date-utils";

interface CommentAuthorProps {
  userId: string;
  username: string;
  timestamp: string;
}

export function CommentAuthor({ userId, username, timestamp }: CommentAuthorProps) {
  const navigate = useNavigate();
  const displayTime = formatRelativeTime(timestamp);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className="font-semibold text-sm hover:underline transition-all"
      >
        {username}
      </button>
      <span className="text-xs text-muted-foreground">
        {displayTime}
      </span>
    </div>
  );
}
