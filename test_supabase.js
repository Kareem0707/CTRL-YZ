import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing insert...");
  const { data, error } = await supabase.from('products').insert([{
    id: "test_" + Math.random().toString(36).substr(2, 9),
    name: "Test Product",
    price: 100,
    description: "test",
    image: "test.jpg"
  }]).select();
  
  if (error) {
    console.error("INSERT ERROR:", error);
  } else {
    console.log("INSERT SUCCESS:", data);
  }
}

test();
