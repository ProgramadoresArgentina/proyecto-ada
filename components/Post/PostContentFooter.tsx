import Link from "next/link";

export default function PostContentFooter({ hashtags }) {
	return (
		<small className="text-gray-500 flex gap-3">
			{hashtags?.map(({ id, name }) => (
				<Link title={name} href={`/blog?hashtag=${name}`} key={id}>
					#{name}
				</Link>
			))}
		</small>
	);
}
