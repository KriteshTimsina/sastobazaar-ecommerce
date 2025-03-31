// "use client";

import Link from "next/link";
import Image from "next/image";
// import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { users } from "@/lib/data";
// import { useSession } from "next-auth/react";
import fetcher from "@/lib/fetcher";
import { URL } from "@/lib/constants";
import {
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash,
} from "lucide-react";
import { APIResponse, User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/app/auth";

export default async function UsersPage() {
  const usersResponse = await fetcher<APIResponse<{ user: User[] }>>(URL.USERS);
  // const user = await auth();

  // console.log(user, "UUUUUUUUUUUUUUU");

  // const [searchQuery, setSearchQuery] = useState("")
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  // const handleDeleteClick = (userId: string) => {
  //   setSelectedUserId(userId)
  //   setDeleteDialogOpen(true)
  // }

  // const handleDeleteConfirm = () => {
  //   // In a real app, you would delete the user here
  //   console.log(`Deleting user ${selectedUserId}`)
  //   setDeleteDialogOpen(false)
  //   setSelectedUserId(null)
  // }

  // const session = useSession();
  // console.log(session, "S");

  if (!usersResponse.status) throw new Error("/admin/users ");

  const users = usersResponse.user;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their permissions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 w-4 h-4" />
            Add User
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="overflow-hidden relative w-8 h-8 rounded-full">
                    <Image
                      src={user.avatar}
                      alt={user.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user._id}`}>
                          <Edit className="mr-2 w-4 h-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user._id}`}>
                          <Shield className="mr-2 w-4 h-4" />
                          Make Admin
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        // onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash className="mr-2 w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove their data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
