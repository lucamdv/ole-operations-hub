async function assertAdmin(ctx) {
  const { data, error } = await ctx.supabase.from("user_roles").select("role").eq("user_id", ctx.userId).eq("role", "admin").maybeSingle();
  if (error || !data) throw new Error("Forbidden");
}
export {
  assertAdmin as a
};
