import { CameraIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ProfileHeaderProps {
  coverImageSrc: string | StaticImageData;
  profileImageSrc: string | StaticImageData;
  username: string | undefined;
  role: string | undefined;
  email: string | undefined;
}
export default function ProfileHeader(props: ProfileHeaderProps) {
  const { coverImageSrc, profileImageSrc, username, role, email } = props;

  return (
    <>
      <div className="border-stroke shadow-default rounded-sm border bg-secondary">
        <div className="py-2 text-center">
          <div className="relative z-20 mx-auto h-32 w-32 rounded-full sm:h-44 sm:w-44 sm:p-3">
            <Image
              src={profileImageSrc}
              alt="profile"
              fill
              className="rounded-full bg-primary p-2 backdrop-blur-sm"
            />
            <label
              htmlFor="profile"
              className="absolute bottom-0 right-0 flex cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <CameraIcon cursor="pointer" size={20} />
              <input
                type="file"
                name="profile"
                id="profile"
                className="sr-only"
              />
            </label>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              {username}
            </h3>
            <p className="font-medium">{role}</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>
      </div>
    </>
  );
}
