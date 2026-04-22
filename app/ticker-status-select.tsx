import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    onChange: (status: boolean) => void;
}

export default function TickerStatusSelect({ onChange }: Props) {
    return (
        <Select onValueChange={(v) => onChange(v === "active")}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}