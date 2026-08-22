"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  ImagePlus,
  Plus,
  Save,
  Check,
  X,
  Lock,
  UserCheck,
  Trash2,
} from "lucide-react";
import { adminFetch, clearToken } from "@/lib/admin-api";

type LanguageItem = {
  code: string;
  name: string;
  isDefault: boolean;
  isEnabled: boolean;
};

type MediaItem = {
  id: string;
  originalFilename: string;
  publicUrl: string | null;
};

const settingKeys = [
  ["contact_email", "Email address"],
  ["contact_phone", "Phone number"],
  ["linkedin_url", "LinkedIn URL"],
  ["github_url", "GitHub URL"],
  ["upwork_url", "Upwork URL"],
  ["figma_url", "Figma URL"],
  ["resume_url", "CV / Resume URL"],
  ["about_photo_url", "About Me Photo URL"],
];

export default function SettingsPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [defaultLang, setDefaultLang] = useState("en");
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");

  const [message, setMessage] = useState("");
  const [langMessage, setLangMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Media Modal state for photo selection
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const loadSettings = async () => {
    const res = await adminFetch("/api/admin/settings");
    if (res.ok) {
      const data = await res.json();
      setValues(
        Object.fromEntries(
          data.map((item: { key: string; value: unknown }) => [
            item.key,
            String(item.value ?? ""),
          ]),
        ),
      );
    }
  };

  const loadLanguages = async () => {
    const res = await adminFetch("/api/languages");
    if (res.ok) {
      const data = await res.json();
      setLanguages(data.languages);
      setDefaultLang(data.defaultLanguage);
    }
  };

  const loadMedia = async () => {
    const res = await adminFetch("/api/admin/media");
    if (res.ok) {
      setMediaList(await res.json());
    }
  };

  useEffect(() => {
    void loadSettings();
    void loadLanguages();
  }, []);

  async function savePublicInfo(event: FormEvent) {
    event.preventDefault();
    setMessage("Saving settings…");
    await Promise.all(
      Object.entries(values).map(([key, value]) =>
        adminFetch(`/api/admin/settings/${key}`, {
          method: "PUT",
          body: JSON.stringify({ value }),
        }),
      ),
    );
    setMessage("Settings saved successfully.");
    setTimeout(() => setMessage(""), 3000);
  }

  async function saveLanguages(updatedLangs: LanguageItem[], updatedDefault: string) {
    setLanguages(updatedLangs);
    setDefaultLang(updatedDefault);
    setLangMessage("Updating languages…");

    const res = await adminFetch("/api/admin/languages", {
      method: "PUT",
      body: JSON.stringify({
        languages: updatedLangs,
        defaultLanguage: updatedDefault,
      }),
    });

    if (res.ok) {
      setLangMessage("Language settings saved.");
    } else {
      setLangMessage("Failed to save language settings.");
    }
    setTimeout(() => setLangMessage(""), 3000);
  }

  function handleAddLanguage(e: FormEvent) {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;
    const code = newCode.trim().toLowerCase();
    if (languages.some((l) => l.code === code)) {
      setLangMessage(`Language "${code}" already exists.`);
      return;
    }
    const updated = [
      ...languages,
      { code, name: newName.trim(), isDefault: false, isEnabled: true },
    ];
    setNewCode("");
    setNewName("");
    void saveLanguages(updated, defaultLang);
  }

  function handleToggleEnabled(code: string) {
    const updated = languages.map((l) =>
      l.code === code ? { ...l, isEnabled: !l.isEnabled } : l,
    );
    void saveLanguages(updated, defaultLang);
  }

  function handleRemoveLanguage(code: string) {
    if (code === defaultLang) {
      setLangMessage("Cannot remove the default language.");
      return;
    }
    const updated = languages.filter((l) => l.code !== code);
    void saveLanguages(updated, defaultLang);
  }

  function handleSetDefaultLanguage(code: string) {
    const updated = languages.map((l) => ({
      ...l,
      isDefault: l.code === code,
      isEnabled: l.code === code ? true : l.isEnabled,
    }));
    void saveLanguages(updated, code);
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("newPassword") !== form.get("confirmation"))
      return setPasswordMessage("Password confirmation does not match.");

    const response = await adminFetch("/api/auth/password", {
      method: "PUT",
      body: JSON.stringify({
        currentPassword: form.get("currentPassword"),
        newPassword: form.get("newPassword"),
      }),
    });

    if (!response.ok)
      return setPasswordMessage(
        "Could not change password. Check your current password (min 12 chars).",
      );

    clearToken();
    router.replace("/admin/login");
  }

  const aboutPhotoUrl = values["about_photo_url"];

  return (
    <>
      <header className="border-b border-white/10 pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
          Platform Configuration
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Settings</h1>
        <p className="mt-2 text-xs text-white/45 sm:text-sm">
          Manage site localization, public contact information, and security credentials.
        </p>
      </header>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        {/* Public Information Panel */}
        <form
          onSubmit={savePublicInfo}
          className="border border-white/15 bg-[#121214] p-6 shadow-xl"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Public Profile Info</h2>
              <p className="text-xs text-white/40">
                Contact details displayed across Hero, Contact section, and Footer.
              </p>
            </div>
            <UserCheck size={20} className="text-[#a855f7]" />
          </div>

          {/* About Photo Picker Preview */}
          <div className="mb-6 border border-white/10 bg-[#0a0a0b] p-4">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
              About Me Profile Photo
            </p>
            <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row">
              <div className="size-20 shrink-0 overflow-hidden border border-white/20 bg-white/5">
                {aboutPhotoUrl ? (
                  <img
                    src={aboutPhotoUrl}
                    alt="About Me"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center font-mono text-[9px] text-white/30">
                    No photo
                  </div>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  value={aboutPhotoUrl ?? ""}
                  onChange={(e) =>
                    setValues((curr) => ({ ...curr, about_photo_url: e.target.value }))
                  }
                  placeholder="https://supastorage.halonso.digital/..."
                  className="w-full border-b border-white/20 bg-transparent py-2 font-mono text-xs text-white outline-none focus:border-[#a855f7]"
                />
                <button
                  type="button"
                  onClick={() => {
                    void loadMedia();
                    setShowMediaModal(true);
                  }}
                  className="mt-3 flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-white/80 transition hover:border-[#a855f7] hover:bg-[#a855f7]/15 hover:text-white"
                >
                  <ImagePlus size={14} /> Select from Media Library
                </button>
              </div>
            </div>
          </div>

          {settingKeys
            .filter(([k]) => k !== "about_photo_url")
            .map(([key, label]) => (
              <label key={key} className="mb-5 block text-xs font-medium text-white/50">
                {label}
                <input
                  value={values[key] ?? ""}
                  onChange={(e) =>
                    setValues((current) => ({ ...current, [key]: e.target.value }))
                  }
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white outline-none focus:border-[#a855f7]"
                />
              </label>
            ))}

          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
            <button className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 px-7 py-3.5 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white">
              <Save size={14} /> Save Profile Info
            </button>
            {message && (
              <span className="font-mono text-xs text-[#a855f7]">{message}</span>
            )}
          </div>
        </form>

        {/* Dynamic Multi-Language Manager */}
        <div className="flex flex-col gap-8">
          <div className="border border-white/15 bg-[#121214] p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Multi-Language & i18n</h2>
                <p className="text-xs text-white/40">
                  Add languages and select your Site Default Language.
                </p>
              </div>
              <Globe size={20} className="text-[#a855f7]" />
            </div>

            {/* Configured Languages List */}
            <div className="grid gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`flex items-center justify-between border p-3.5 transition ${
                    lang.isDefault
                      ? "border-[#a855f7] bg-[#a855f7]/10"
                      : "border-white/10 bg-[#0a0a0b]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSetDefaultLanguage(lang.code)}
                      title="Click to set as Site Default Language"
                      className={`grid size-5 place-items-center rounded-full border ${
                        lang.isDefault
                          ? "border-[#a855f7] bg-[#a855f7] text-white"
                          : "border-white/30 hover:border-white"
                      }`}
                    >
                      {lang.isDefault && <Check size={12} />}
                    </button>
                    <div>
                      <strong className="text-sm font-semibold text-white">
                        {lang.name}
                      </strong>
                      <span className="ml-2 font-mono text-[10px] uppercase text-[#c084fc]">
                        ({lang.code})
                      </span>
                      {lang.isDefault && (
                        <span className="ml-3 rounded bg-[#a855f7] px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                          SITE DEFAULT
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase text-white/60">
                      <input
                        type="checkbox"
                        checked={lang.isEnabled}
                        onChange={() => handleToggleEnabled(lang.code)}
                        disabled={lang.isDefault}
                      />
                      Active
                    </label>
                    {!lang.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang.code)}
                        className="text-white/30 hover:text-red-400"
                        title="Remove language"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Language Form */}
            <form
              onSubmit={handleAddLanguage}
              className="mt-6 border-t border-white/10 pt-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7]">
                Add New Language
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-[100px_1fr_auto]">
                <input
                  type="text"
                  placeholder="Code (e.g. fr)"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  maxLength={5}
                  required
                  className="border-b border-white/20 bg-transparent py-2 font-mono text-xs text-white outline-none focus:border-[#a855f7]"
                />
                <input
                  type="text"
                  placeholder="Name (e.g. French)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="border-b border-white/20 bg-transparent py-2 text-xs text-white outline-none focus:border-[#a855f7]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 border border-[#a855f7] bg-[#a855f7]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] hover:bg-[#9333ea] hover:text-white"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </form>
            {langMessage && (
              <p className="mt-4 font-mono text-xs text-[#a855f7]">{langMessage}</p>
            )}
          </div>

          {/* Security Credentials */}
          <form
            onSubmit={changePassword}
            className="border border-white/15 bg-[#121214] p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Security & Password</h2>
                <p className="text-xs text-white/40">
                  Update administrative authentication secret.
                </p>
              </div>
              <Lock size={20} className="text-[#a855f7]" />
            </div>

            <input
              name="currentPassword"
              type="password"
              required
              placeholder="Current password"
              className="mb-4 w-full border-b border-white/20 bg-transparent py-2.5 text-xs outline-none focus:border-[#a855f7]"
            />
            <input
              name="newPassword"
              type="password"
              required
              minLength={12}
              placeholder="New password (min 12 chars)"
              className="mb-4 w-full border-b border-white/20 bg-transparent py-2.5 text-xs outline-none focus:border-[#a855f7]"
            />
            <input
              name="confirmation"
              type="password"
              required
              minLength={12}
              placeholder="Confirm new password"
              className="mb-6 w-full border-b border-white/20 bg-transparent py-2.5 text-xs outline-none focus:border-[#a855f7]"
            />

            <button className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/10 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white">
              Update Security Password
            </button>
            {passwordMessage && (
              <p className="mt-4 font-mono text-xs text-red-400">{passwordMessage}</p>
            )}
          </form>
        </div>
      </div>

      {/* Supabase Media Selection Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#121214] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Select About Photo</h3>
              <button
                onClick={() => setShowMediaModal(false)}
                className="rounded p-1 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-6 grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
              {mediaList.map((media) => (
                <div
                  key={media.id}
                  onClick={() => {
                    if (media.publicUrl) {
                      setValues((curr) => ({ ...curr, about_photo_url: media.publicUrl! }));
                      setShowMediaModal(false);
                    }
                  }}
                  className="group relative aspect-square cursor-pointer overflow-hidden border border-white/10 bg-black/40 p-2 hover:border-[#a855f7]"
                >
                  {media.publicUrl ? (
                    <img
                      src={media.publicUrl}
                      alt={media.originalFilename}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-mono text-[9px] text-white/30">
                      No URL
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#a855f7]/20 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded bg-black/80 px-2 py-1 font-mono text-[9px] font-bold text-white">
                      Select
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!mediaList.length && (
              <p className="py-12 text-center font-mono text-xs text-white/40">
                No media items uploaded yet. Upload images in the Media section first.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
