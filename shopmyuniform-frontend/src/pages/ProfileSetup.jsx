import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get("setup") === "1";

  const [schools, setSchools] = useState([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    school: user?.school?._id || user?.school || "",
    studentDetails: {
      studentName: user?.studentDetails?.studentName || "",
      grade: user?.studentDetails?.grade || "",
      section: user?.studentDetails?.section || "",
    },
    phone: user?.phone || "",
    address: {
      line1: user?.address?.line1 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    },
  });

  useEffect(() => {
    api.get("/schools").then(({ data }) => setSchools(data.schools));
  }, []);

  const selectedSchool = schools.find((s) => s._id === form.school);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl font-semibold text-navy">
        {isSetup ? "Set up your profile" : "Your profile"}
      </h1>
      <p className="mt-1 text-sm text-navy/60">
        {isSetup
          ? "Tell us about your child and their school so we can show the right uniform items."
          : "Update your details anytime."}
      </p>

      <form onSubmit={submit} className="mt-8 space-y-8">
        <section className="rounded-lg border border-navy/10 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy">Account</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Your name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Phone</label>
              <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-navy/10 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy">School & student</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">School</label>
              <select
                className="input-field"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
              >
                <option value="">Select a school</option>
                {schools.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Grade / class</label>
              <select
                className="input-field"
                value={form.studentDetails.grade}
                onChange={(e) => setForm({ ...form, studentDetails: { ...form.studentDetails, grade: e.target.value } })}
              >
                <option value="">Select grade</option>
                {(selectedSchool?.classes || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Student name</label>
              <input
                className="input-field"
                value={form.studentDetails.studentName}
                onChange={(e) => setForm({ ...form, studentDetails: { ...form.studentDetails, studentName: e.target.value } })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Section</label>
              <input
                className="input-field"
                value={form.studentDetails.section}
                onChange={(e) => setForm({ ...form, studentDetails: { ...form.studentDetails, section: e.target.value } })}
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-navy/10 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy">Delivery address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-navy/80">Address line</label>
              <input
                className="input-field"
                value={form.address.line1}
                onChange={(e) => setForm({ ...form, address: { ...form.address, line1: e.target.value } })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">City</label>
              <input
                className="input-field"
                value={form.address.city}
                onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">State</label>
              <input
                className="input-field"
                value={form.address.state}
                onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy/80">Pincode</label>
              <input
                className="input-field"
                value={form.address.pincode}
                onChange={(e) => setForm({ ...form, address: { ...form.address, pincode: e.target.value } })}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save profile"}
          </button>
          {saved && <span className="text-sm font-medium text-green-700">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
