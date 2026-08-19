import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Friend, Gender } from "@/data/mockData";
import { useSlamBook } from "@/hooks/useSlamBook";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(40),
  lastName: z.string().trim().min(1, "Last name is required").max(40),
  nickname: z.string().trim().max(30),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(20),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = {
  firstName: "",
  lastName: "",
  nickname: "",
  email: "",
  phone: "",
  gender: "OTHER",
  dateOfBirth: "",
};

export function FriendFormDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: Friend | null;
}) {
  const { addFriend, updateFriend } = useSlamBook();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      editing
        ? {
            firstName: editing.firstName,
            lastName: editing.lastName,
            nickname: editing.nickname,
            email: editing.email,
            phone: editing.phone,
            gender: editing.gender,
            dateOfBirth: editing.dateOfBirth,
          }
        : empty,
    );
  }, [open, editing]);

  const set = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }) as FormState);

  const submit = () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    if (editing) {
      updateFriend(editing.id, parsed.data);
      toast.success(`${parsed.data.firstName} updated successfully!`);
    } else {
      addFriend(parsed.data);
      toast.success("Friend added successfully!");
    }
    onOpenChange(false);
  };

  const field = (
    key: keyof FormState,
    label: string,
    type = "text",
    placeholder = "",
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value)}
        className="rounded-xl"
      />
      {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {editing ? "Edit friend" : "Add a friend"}
          </DialogTitle>
          <DialogDescription>
            Everyone in your slam book starts with a name and a nickname.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("firstName", "First name", "text", "Aarav")}
          {field("lastName", "Last name", "text", "Sharma")}
          {field("nickname", "Nickname", "text", "Ari")}
          <div className="space-y-1.5">
            <Label>Gender</Label>
            <Select value={form.gender} onValueChange={(v) => set("gender", v as Gender)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {field("email", "Email", "email", "friend@email.com")}
          {field("phone", "Phone", "tel", "+91 90000 00000")}
          <div className="sm:col-span-2">{field("dateOfBirth", "Date of birth", "date")}</div>
        </div>

        <DialogFooter>
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="rounded-full" onClick={submit}>
            {editing ? "Save changes" : "Add friend"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
