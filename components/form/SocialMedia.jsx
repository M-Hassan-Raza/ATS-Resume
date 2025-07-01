import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import { FaTimes, FaPlus } from "react-icons/fa";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // social media
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    const newSocialMedia = {
      id: Date.now() + Math.random(), // Generate unique ID
      socialMedia: "", 
      link: "" 
    };
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, newSocialMedia],
    });
  };

  const removeSocialMedia = (id) => {
    const newSocialMedia = resumeData.socialMedia.filter(social => 
      (social.id || `${social.socialMedia}-${social.link}`) !== id
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Social Media</h2>
      {resumeData.socialMedia.map((socialMedia, index) => {
        const stableKey = socialMedia.id || `${socialMedia.socialMedia}-${socialMedia.link}-${index}`;
        return (
        <div key={stableKey} className="relative border border-gray-300 rounded-lg p-3 bg-white/50">
          <div className="flex-wrap-gap-2">
          <input
            type="text"
            placeholder="Social Media"
            name="socialMedia"
            className="other-input"
            value={socialMedia.socialMedia}
            onChange={(e) => handleSocialMedia(e, index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="other-input"
            value={socialMedia.link}
            onChange={(e) => handleSocialMedia(e, index)}
          />
          </div>
          {resumeData.socialMedia.length > 1 && (
            <button
              type="button"
              onClick={() => removeSocialMedia(stableKey)}
              className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Remove this social media"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
        );
      })}
      <button
        type="button"
        onClick={addSocialMedia}
        className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
      >
        <FaPlus size={12} />
        <span>Add Social Media</span>
      </button>
    </div>
  );
};

export default SocialMedia;
