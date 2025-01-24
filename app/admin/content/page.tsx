'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Search,
  Tag,
  Calendar,
  Edit,
  Trash2,
  Eye,
  MoreVertical
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published';
  author: string;
  date: string;
  image_url: string;
  tags: string[];
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Business Technology',
    content: 'Lorem ipsum...',
    excerpt: 'Explore emerging trends shaping the future of business technology and digital transformation.',
    category: 'Technology',
    status: 'published',
    author: 'John Doe',
    date: '2024-01-20',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    tags: ['Technology', 'Business', 'Innovation']
  },
  {
    id: '2',
    title: 'Maximizing Productivity with Smart Office Solutions',
    content: 'Lorem ipsum...',
    excerpt: 'Learn how smart office solutions can boost your team\'s productivity and efficiency.',
    category: 'Productivity',
    status: 'draft',
    author: 'Jane Smith',
    date: '2024-01-18',
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800',
    tags: ['Productivity', 'Office', 'Technology']
  }
];

export default function ContentPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: 'Post deleted',
      description: 'The post has been deleted successfully.'
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input placeholder="Enter post title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <Textarea placeholder="Enter post excerpt" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <Input placeholder="Enter tags (comma separated)" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <Textarea className="h-[200px]" placeholder="Enter post content" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                  <Input placeholder="Enter image URL" />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <Tag className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Productivity">Productivity</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <FileText className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {post.category}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}