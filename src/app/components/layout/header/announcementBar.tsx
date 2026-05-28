"use client";

const AnnouncementBar = () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="group relative bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${basePath}/images/announcementbar/announcementbar-bg.jpg')` }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AnnouncementBar
