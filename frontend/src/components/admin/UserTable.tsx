'use client';
import React, { FC, useState } from 'react';
import { Edit, MoreHorizontal, Shield, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { type User } from '@/types';
import Link from 'next/link';

type UserTable = {
  user: User;
};

export const UserTable: FC<UserTable> = ({ user }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting user ${selectedUserId}`);
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <TableRow key={user._id}>
        <TableCell>
          <div className="overflow-hidden relative w-8 h-8 rounded-full">
            <Image src={user.avatar} alt={user.username} fill className="object-cover" />
          </div>
        </TableCell>
        <TableCell className="font-medium">{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        </TableCell>
        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                onClick={() => handleDeleteClick(user._id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash className="mr-2 w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove
              their data from our servers.
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
      </Dialog>
    </>
  );
};
