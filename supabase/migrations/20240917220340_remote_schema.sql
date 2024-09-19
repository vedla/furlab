create policy "Give users access to own folder vwdc34_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'user_media'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));
create policy "Give users access to own folder vwdc34_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'user_media'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));
create policy "Give users access to own folder vwdc34_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'user_media'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));
create policy "Give users access to own folder vwdc34_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'user_media'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));
