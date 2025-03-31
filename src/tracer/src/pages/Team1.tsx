import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const TeamMemberCard = ({ member, onClick, isHighlighted }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all ${isHighlighted ? 'col-span-1 md:col-span-2' : 'col-span-1'
                }`}
            onClick={onClick}
        >
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover transition-opacity duration-500 hover:opacity-50"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-gray-300">{member.role}</p>
                <p className="text-sm text-gray-400 mt-2">{member.bio}</p>
                <div className="flex gap-3 mt-2">
                    {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    )}
                    {member.social.email && (
                        <a href={`mailto:${member.social.email}`} className="text-gray-300 hover:text-blue-500">
                            <Mail className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Team1 = () => {
    const teamMembers = {
        'Core Research Team': [
            {
                name: 'Jishnu Manglam',
                role: 'Core Research Member',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
                bio: 'Leading the TRACER project with expertise in synthetic biology and cancer research.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/jishnumanglam',
                    email: 'jishnu.manglam@gmail.com',
                },
            },
            {
                name: 'Kairav Barua',
                role: 'Core Research Member',
                image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80',
                bio: 'Specializing in biomarker detection and therapeutic delivery systems.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/kairav-barua-9332b8283',
                    email: 'kairav.barua@gmail.com',
                },
            },
        ],
        'Sponsor & Outreach Team': [
            {
                name: 'Bhumika Marmat',
                role: 'Spons Lead',
                image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&q=80',
                bio: 'Leading sponsorship efforts and outreach initiatives for TRACER.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/bhumikamarmat',
                    email: 'bhumikamarmat@kgpian.iitkgp.ac.in',
                },
            },
            {
                name: 'Vihar Davuluri',
                role: 'Spons Lead',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
                bio: 'Driving sponsorship strategies and outreach campaigns for TRACER.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/vihar-davuluri-40254326a',
                    email: 'vihardavuluri@gmail.com',
                },
            },
        ],
        'Web Dev Team': [
            {
                name: 'Jithendra Bhati',
                role: 'Web Dev Member',
                image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80',
                bio: 'Developing and maintaining the TRACER website with a focus on user experience.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/jitendra-bhati123iitkgp',
                    email: 'bhatijitendra2022@gmail.com',
                },
            },
            {
                name: 'Rohan',
                role: 'Web Dev Member',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
                bio: 'Contributing to the TRACER website’s design and functionality.',
                social: {
                    linkedin: 'https://www.linkedin.com/in/rohan2311',
                    email: 'rohankumarpandey234@gmail.com',
                },
            },
        ],
    };

    const [currentTeam, setCurrentTeam] = useState('Core Research Team');
    const [highlightedMember, setHighlightedMember] = useState(teamMembers[currentTeam][0]);

    const handleTeamChange = (team) => {
        setCurrentTeam(team);
        setHighlightedMember(teamMembers[team][0]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Heading and CTA */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Meet Our Amazing Team</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        The minds behind our innovative solutions.
                    </p>
                    <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition">
                        Join Our Team
                    </button>
                </div>

                {/* Team Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    {Object.keys(teamMembers).map((team) => (
                        <button
                            key={team}
                            onClick={() => handleTeamChange(team)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentTeam === team
                                ? 'bg-green-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {team}
                        </button>
                    ))}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <TeamMemberCard
                            member={highlightedMember}
                            isHighlighted={true}
                        />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {teamMembers[currentTeam]
                            .filter((member) => member !== highlightedMember)
                            .map((member) => (
                                <TeamMemberCard
                                    key={member.name}
                                    member={member}
                                    onClick={() => setHighlightedMember(member)}
                                    isHighlighted={false}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team1;
