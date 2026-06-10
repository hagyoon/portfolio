import SettingsForm from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-2">Account</h1>
      <p className="text-stone-500 text-sm mb-10">
        Login email, password, and the recovery address used by “Forgot
        password”. Changes redeploy the site (~1 minute) and sign you out.
      </p>
      <SettingsForm />
    </div>
  );
}
